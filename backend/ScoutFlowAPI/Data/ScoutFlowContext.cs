﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ScoutFlowAPI.Models;

namespace ScoutFlowAPI.Data;

public partial class ScoutFlowContext : DbContext
{
    public ScoutFlowContext(DbContextOptions<ScoutFlowContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<Local> Locals { get; set; }

    public virtual DbSet<PrismaMigration> PrismaMigrations { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Test> Tests { get; set; }

    public virtual DbSet<Unit> Units { get; set; }

    public virtual DbSet<UserMetadatum> UserMetadata { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresEnum("AgeGroup", new[] { "Farfadet", "Louveteau", "Scout", "Pionnier", "Compagnon" });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("event_pkey");

            entity.ToTable("event");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.EndDate)
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("end_date");
            entity.Property(e => e.LocalId).HasColumnName("local_id");
            entity.Property(e => e.Name)
                .HasMaxLength(256)
                .HasColumnName("name");
            entity.Property(e => e.NeedHelp)
                .HasDefaultValue(false)
                .HasColumnName("need_help");
            entity.Property(e => e.StartDate)
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("start_date");
            entity.Property(e => e.UnitId).HasColumnName("unit_id");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Local).WithMany(p => p.Events)
                .HasForeignKey(d => d.LocalId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("event_local_id_fkey");

            entity.HasOne(d => d.Unit).WithMany(p => p.Events)
                .HasForeignKey(d => d.UnitId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("event_unit_id_fkey");
        });

        modelBuilder.Entity<Local>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("local_pkey");

            entity.ToTable("local");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(1024)
                .HasColumnName("address");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.KeyrespUserid)
                .HasMaxLength(100)
                .HasColumnName("keyresp_userid");
            entity.Property(e => e.Name)
                .HasMaxLength(256)
                .HasColumnName("name");
            entity.Property(e => e.Postalcode)
                .HasMaxLength(10)
                .HasColumnName("postalcode");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.KeyrespUser).WithMany(p => p.Locals)
                .HasForeignKey(d => d.KeyrespUserid)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("local_keyresp_userid_fkey");
        });

        modelBuilder.Entity<PrismaMigration>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("_prisma_migrations_pkey");

            entity.ToTable("_prisma_migrations");

            entity.Property(e => e.Id)
                .HasMaxLength(36)
                .HasColumnName("id");
            entity.Property(e => e.AppliedStepsCount)
                .HasDefaultValue(0)
                .HasColumnName("applied_steps_count");
            entity.Property(e => e.Checksum)
                .HasMaxLength(64)
                .HasColumnName("checksum");
            entity.Property(e => e.FinishedAt).HasColumnName("finished_at");
            entity.Property(e => e.Logs).HasColumnName("logs");
            entity.Property(e => e.MigrationName)
                .HasMaxLength(255)
                .HasColumnName("migration_name");
            entity.Property(e => e.RolledBackAt).HasColumnName("rolled_back_at");
            entity.Property(e => e.StartedAt)
                .HasDefaultValueSql("now()")
                .HasColumnName("started_at");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("role_pkey");

            entity.ToTable("role");

            entity.HasIndex(e => e.Name, "role_name_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Test>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("test_pkey");

            entity.ToTable("test");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<Unit>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("unit_pkey");

            entity.ToTable("unit");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.LocalId).HasColumnName("local_id");
            entity.Property(e => e.Name)
                .HasMaxLength(256)
                .HasColumnName("name");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("timestamp(6) without time zone")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Local).WithMany(p => p.Units)
                .HasForeignKey(d => d.LocalId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("unit_local_id_fkey");
        });

        modelBuilder.Entity<UserMetadatum>(entity =>
        {
            entity.HasKey(e => e.FirebaseId).HasName("user_metadata_pkey");

            entity.ToTable("user_metadata");

            entity.Property(e => e.FirebaseId)
                .HasMaxLength(100)
                .HasColumnName("firebase_id");

            entity.HasMany(d => d.Events).WithMany(p => p.Chefs)
                .UsingEntity<Dictionary<string, object>>(
                    "UserMetadataOnevent",
                    r => r.HasOne<Event>().WithMany()
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasConstraintName("user_metadataONevent_event_id_fkey"),
                    l => l.HasOne<UserMetadatum>().WithMany()
                        .HasForeignKey("ChefId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasConstraintName("user_metadataONevent_chef_id_fkey"),
                    j =>
                    {
                        j.HasKey("ChefId", "EventId").HasName("user_metadataONevent_pkey");
                        j.ToTable("user_metadataONevent");
                        j.IndexerProperty<string>("ChefId").HasColumnName("chef_id");
                        j.IndexerProperty<int>("EventId").HasColumnName("event_id");
                    });

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserMetadataOnrole",
                    r => r.HasOne<Role>().WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasConstraintName("user_metadataONrole_role_id_fkey"),
                    l => l.HasOne<UserMetadatum>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasConstraintName("user_metadataONrole_user_id_fkey"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId").HasName("user_metadataONrole_pkey");
                        j.ToTable("user_metadataONrole");
                        j.IndexerProperty<string>("UserId").HasColumnName("user_id");
                        j.IndexerProperty<int>("RoleId").HasColumnName("role_id");
                    });

            entity.HasMany(d => d.Units).WithMany(p => p.Chefs)
                .UsingEntity<Dictionary<string, object>>(
                    "UserMetadataOnunit",
                    r => r.HasOne<Unit>().WithMany()
                        .HasForeignKey("UnitId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasConstraintName("user_metadataONunit_unit_id_fkey"),
                    l => l.HasOne<UserMetadatum>().WithMany()
                        .HasForeignKey("ChefId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .HasConstraintName("user_metadataONunit_chef_id_fkey"),
                    j =>
                    {
                        j.HasKey("ChefId", "UnitId").HasName("user_metadataONunit_pkey");
                        j.ToTable("user_metadataONunit");
                        j.IndexerProperty<string>("ChefId").HasColumnName("chef_id");
                        j.IndexerProperty<int>("UnitId").HasColumnName("unit_id");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}