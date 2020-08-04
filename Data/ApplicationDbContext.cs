using ExlNetCoreReactSQL.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NetCoreExl.Data;

namespace NetCoreExl.Data
{
    public partial class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public virtual DbSet<ExlEmployee> ExlEmployee { get; set; }
        public virtual DbSet<ExlTeam> ExlTeam { get; set; }
        public virtual DbSet<ExlTeamEmployee> ExlTeamEmployee { get; set; }
        public virtual DbSet<ExlEmployeeView> ExlEmployeeView { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<ExlEmployee>(entity =>
            {
                entity.Property(e => e.Gender).HasDefaultValueSql("('F')");
            });

            modelBuilder.Entity<ExlEmployeeView>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("ExlEmployeeView");

                entity.Property(e => e.TeamName).IsUnicode(false);
            });

            modelBuilder.Entity<ExlTeam>(entity =>
            {
                entity.Property(e => e.TeamName).IsUnicode(false);
            });

            modelBuilder.Entity<ExlTeamEmployee>(entity =>
            {
                entity.HasNoKey();

                entity.HasOne(d => d.Employee)
                    .WithMany()
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ExlTeamEmployee_ExlEmployee");

                entity.HasOne(d => d.Team)
                    .WithMany()
                    .HasForeignKey(d => d.TeamId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ExlTeamEmployee_ExlTeam");
            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
