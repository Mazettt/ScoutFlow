﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace ScoutFlowAPI.Models;

public partial class Role
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<PendingUser> PendingUsers { get; set; } = new List<PendingUser>();

    public virtual ICollection<UserMetadatum> Users { get; set; } = new List<UserMetadatum>();
}