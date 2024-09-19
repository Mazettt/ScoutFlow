using System;

namespace ScoutFlowAPI.Models;

public class ErrorResponse(string msg, string? details = null)
{
    public string Msg { get; set; } = msg;
    public string? Details { get; set; } = details;
}
