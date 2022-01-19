using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ReactExcuses.Data
{
    public class ExcusesRepository
    {
        private readonly string _connectionString;
        public ExcusesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public ExcuseApiItem GetRandomExcuse()
        {
            var client = new HttpClient();
            var json = client.GetStringAsync("https://excuser.herokuapp.com/v1/excuse/1")
                .Result;
            var excuse = JsonConvert.DeserializeObject<List<ExcuseApiItem>>(json).First();
            using var context = new ExcusesDbContext(_connectionString);
            excuse.Id = 0;
            if (!context.Excuses.Any(e => e.Excuse == excuse.Excuse))
            {
                context.Excuses.Add(excuse);
                context.SaveChanges();
            }
            return context.Excuses.Include(e => e.UserLikedExcuses).FirstOrDefault(e => e.Excuse == excuse.Excuse);
        }     

        public List<ExcuseApiItem> ViewExcuses()
        {
            var context = new ExcusesDbContext(_connectionString);
            return context.Excuses.Include(e => e.UserLikedExcuses).ToList();
        }

        public void AddExcuse(ExcuseApiItem excuse)
        {
            var ctx = new ExcusesDbContext(_connectionString);
            ctx.Excuses.Add(excuse);
            ctx.SaveChanges();
        }

        public ExcuseApiItem LikeExcuse(UserLikedExcuses like)
        {
            var ctx = new ExcusesDbContext(_connectionString);
            ctx.UserLikedExcuses.Add(like);
            ctx.SaveChanges();
            return ctx.Excuses.FirstOrDefault(e => e.Id == like.ExcuseId);
        }

        public ExcuseApiItem GetExcuseById(int excuseId)
        {
            using var ctx = new ExcusesDbContext(_connectionString);
            return ctx.Excuses.Include(e => e.UserLikedExcuses).FirstOrDefault(e => e.Id == excuseId);
        }
      
    }
}
    