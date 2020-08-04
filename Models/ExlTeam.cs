using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NetCoreExl.Data
{
    public partial class ExlTeam
    {
        [Key]
        public int TeamId { get; set; }
        [Required]
        [StringLength(256)]
        public string TeamName { get; set; }
    }
}
