using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ReactExcuses.Data;
using ReactExcuses.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ReactExcuses.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcusesController : ControllerBase
    {
        private readonly string _connectionString;

        public ExcusesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getexcuse")]
        public ExcuseApiItem GetExcuse()
        {
            var client = new HttpClient();
            string json = client.GetStringAsync("https://excuser.herokuapp.com/v1/excuse/1").Result;
            var excuses = JsonConvert.DeserializeObject<List<ExcuseApiItem>>(json);
            var newExcuse = excuses[0];
            var repo = new ExcusesRepository(_connectionString);
            var excuse = repo.GetExcuseById(newExcuse.Id);
            if (excuse == null)
            {
                newExcuse.Id = 0;
                repo.AddExcuse(newExcuse);
                excuse = newExcuse;
            }
            return excuse;
        }

        [HttpGet]
        [Route("ViewAll")]
        public List<ExcuseApiItem> ViewAll()
        {
            var repo = new ExcusesRepository(_connectionString);
            return repo.ViewExcuses();
        }

        [HttpPost]
        [Route("addlike")]
        public ExcuseApiItem AddLike(int UserId, int ExcuseId, bool Like)
        {
            var like = new UserLikedExcuses
            {
                UserId = UserId,
                ExcuseId = ExcuseId,
                Liked = Like,
                Date = DateTime.Now
            };
            var repo = new ExcusesRepository(_connectionString);
            return repo.LikeExcuse(like);
        }

        [HttpGet]
        [Route("getupdatedexcuse")]
        public ExcuseApiItem GetUpdatedExcuse(int excuseId)
        {
            var repo = new ExcusesRepository(_connectionString);
            return repo.GetExcuseById(excuseId);
        }

        [HttpGet]
        [Route("isRecent")]
        public bool IsRecent(DateTime time)
        {
            var time2 = time.AddMinutes(5);
            var now = DateTime.Now.ToLocalTime();
            return time2 > now;
        }

        [HttpPost]
        [Route("updatelike")]
        public ExcuseApiItem UpdateLike(int userId, int excuseId, bool liked)
        {

            var like = new UserLikedExcuses
            {
                UserId =  userId,
                ExcuseId = excuseId,
                Liked = liked,
                Date = DateTime.Now
            };
            var repo = new ExcusesRepository(_connectionString);
            return repo.LikeExcuse(like);
        }

    }
}
