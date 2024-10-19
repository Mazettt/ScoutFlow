using System;
using FirebaseAdmin.Auth;
using ScoutFlowAPI.Models;

namespace ScoutFlowAPI.Middlewares;

public class Auth(RequestDelegate next /*, IServiceProvider serviceProvider*/)
{
    private static async Task SendUnauthorizedResponse(HttpContext context)
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsJsonAsync(new ErrorResponse("Session invalide", "Aucun cookie de session"));
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // using var scope = serviceProvider.CreateScope();
        // var userService = scope.ServiceProvider.GetRequiredService<UserService>();

        string? sessionCookie = context.Request.Cookies["session"];
        if (string.IsNullOrEmpty(sessionCookie))
        {
            await SendUnauthorizedResponse(context);
            return;
        }
        try
        {
            FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifySessionCookieAsync(sessionCookie, true);
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
