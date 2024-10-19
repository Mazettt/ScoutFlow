using System;
using FirebaseAdmin.Auth;
using ScoutFlowAPI.Models;

namespace ScoutFlowAPI.Middlewares;

public class VerifiedUser(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Items["firebaseToken"] is not FirebaseToken decodedToken)
        {
            throw new Exception("firebaseToken not found");
        }

        if (!decodedToken.Claims.TryGetValue("Verified", out object? isVerified) || !(bool)isVerified)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await context.Response.WriteAsJsonAsync(new ErrorResponse("Accès refusé", "Votre compte n'a pas encore été vérifié"));
            return;
        }

        await next(context);
    }
}
