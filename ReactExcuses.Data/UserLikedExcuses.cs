using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactExcuses.Data
{
    public class UserLikedExcuses
    {
        public int UserId { get; set; }
        public int ExcuseId { get; set; }
        public bool Liked { get; set; }
        public DateTime Date { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        [JsonIgnore]
        public ExcuseApiItem Excuse { get; set; }
    }
}
