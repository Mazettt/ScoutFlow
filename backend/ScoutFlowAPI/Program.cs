using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.EntityFrameworkCore;
using ScoutFlowAPI.Data;
using ScoutFlowAPI.Middlewares;
using ScoutFlowAPI.Models;
using ScoutFlowAPI.Services;

const string AllowFrontendLocalhostOrigin = "_allowFrontendLocalhostOrigin";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowFrontendLocalhostOrigin, policy =>
        {
            policy.WithOrigins("https://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
            policy.WithOrigins("http://localhost:7271")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

builder.Services.AddControllers();
builder.Services.AddRouting(options => options.LowercaseUrls = true);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

if (builder.Environment.IsProduction()) {
    builder.Configuration.AddJsonFile("/run/secrets/appsettings.json");
}

builder.Services.AddDbContext<ScoutFlowContext>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

IConfigurationSection? firebaseSec = builder.Configuration.GetSection("FirebaseConfig") ?? throw new InvalidOperationException("FirebaseConfig not found");
JsonCredentialParameters firebaseConfig = new()
{
    Type = firebaseSec.GetValue<string>("type"),
    ProjectId = firebaseSec.GetValue<string>("project_id"),
    PrivateKeyId = firebaseSec.GetValue<string>("private_key_id"),
    PrivateKey = firebaseSec.GetValue<string>("private_key"),
    ClientEmail = firebaseSec.GetValue<string>("client_email"),
    ClientId = firebaseSec.GetValue<string>("client_id"),
    TokenUri = firebaseSec.GetValue<string>("token_uri"),
    UniverseDomain = firebaseSec.GetValue<string>("universe_domain"),
};

FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromJsonParameters(firebaseConfig),
    ProjectId = "scoutflow-9a3c2"
});

// Register services
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<TestService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.UseCors(AllowFrontendLocalhostOrigin);

app.MapGet("/", () => "ScoutFlow API");

app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);
        context.Response.StatusCode = 500;
        await context.Response.WriteAsJsonAsync(new ErrorResponse("Une erreur est survenue", ex.Message));
    }
});

app.UseWhen(context => context.Request.Path.StartsWithSegments("/auth/profile"), appBuilder => {
    appBuilder.UseMiddleware<Auth>();
});

app.UseWhen(context => context.Request.Path.StartsWithSegments("/api"), appBuilder => {
    appBuilder.UseMiddleware<Auth>();
    appBuilder.UseMiddleware<VerifiedUser>();
});

app.UseWhen(context => context.Request.Path.StartsWithSegments("/api/admin"), appBuilder => {
    appBuilder.UseMiddleware<Admin>();
});

app.Run();
