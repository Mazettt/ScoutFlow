﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace ScoutFlowAPI.Models;

public partial class Event
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public bool NeedHelp { get; set; }

    public int UnitId { get; set; }

    public int LocalId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual Local Local { get; set; } = null!;

    public virtual Unit Unit { get; set; } = null!;

    public virtual ICollection<Userdatum> Chefs { get; set; } = new List<Userdatum>();
}