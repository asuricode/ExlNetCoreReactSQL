using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCoreExl.Data
{
    public partial class ExlEmployeeView
    {
        public int Id { get; set; }
        [Required]
        [StringLength(256)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(256)]
        public string LastName { get; set; }
        [Required]
        [StringLength(256)]
        public string MiddleName { get; set; }
        [Column(TypeName = "date")]
        public DateTime StartDate { get; set; }
        [Column(TypeName = "date")]
        public DateTime? EndDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime CreateDate { get; set; }
        [Required]
        [StringLength(450)]
        public string CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime ModifiedDate { get; set; }
        [Required]
        [StringLength(450)]
        public string ModifiedBy { get; set; }
        [Column(TypeName = "date")]
        public DateTime BirthDate { get; set; }
        public decimal Salary { get; set; }
        [Required]
        [Column(TypeName = "string")]
        public string Gender { get; set; }
        [Required]
        [StringLength(256)]
        public string TeamName { get; set; }
    }
}
