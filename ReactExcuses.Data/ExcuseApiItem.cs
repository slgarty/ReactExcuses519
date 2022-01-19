using System;
using System.Collections.Generic;

namespace ReactExcuses.Data
{
    public class ExcuseApiItem
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Excuse { get; set; }
        public List<UserLikedExcuses> UserLikedExcuses { get; set; }
    }
}
