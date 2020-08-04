using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCoreExl.Data
{
    public partial class ExlTeamEmployee
    {
        public int TeamId { get; set; }
        public int EmployeeId { get; set; }

        [ForeignKey(nameof(EmployeeId))]
        public virtual ExlEmployee Employee { get; set; }
        [ForeignKey(nameof(TeamId))]
        public virtual ExlTeam Team { get; set; }
    }
}
