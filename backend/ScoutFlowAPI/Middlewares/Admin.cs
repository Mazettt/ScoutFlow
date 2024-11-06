using System;
using FirebaseAdmin.Auth;
using ScoutFlowAPI.Models;

namespace ScoutFlowAPI.Middlewares;

public class Admin(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Items["firebaseToken"] is not FirebaseToken decodedToken)
        {
            throw new Exception("firebaseToken not found");
        }

        if (!decodedToken.Claims.ContainsKey("Admin") || (bool)decodedToken.Claims["Admin"] == false)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsJsonAsync(new ErrorResponse("Accès refusé", "Vous n'avez pas les droits nécessaires"));
            return;
        }

        await next(context);
    }
}
