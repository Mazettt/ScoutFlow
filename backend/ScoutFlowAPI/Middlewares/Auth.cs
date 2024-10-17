using System;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Mvc;
using ScoutFlowAPI.Models;

namespace ScoutFlowAPI.Middlewares;

public class Auth(RequestDelegate next)
{
    private static async Task SendUnauthorizedResponse(HttpContext context)
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsJsonAsync(new ErrorResponse("Session invalide", "Aucun cookie de session"));
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var sessionCookie = context.Request.Cookies["session"];
        if (string.IsNullOrEmpty(sessionCookie))
        {
            await SendUnauthorizedResponse(context);
            return;
        }
        try
        {
            var decodedToken = await FirebaseAuth.DefaultInstance.VerifySessionCookieAsync(sessionCookie, true);
            context.Items["firebaseToken"] = decodedToken;
        }
        catch (FirebaseAuthException)
        {
            await SendUnauthorizedResponse(context);
            return;
        }

        await next(context);
    }
}
