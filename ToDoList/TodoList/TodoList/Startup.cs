using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TodoList.Database;
using TodoList.Repositories.Implementations;
using TodoList.Repositories.Interfaces;
using TodoList.Services.ListService.Implementations;
using TodoList.Services.ListService.Interfaces;
using TodoList.Services.TaskService.Implementations;
using TodoList.Services.TaskService.Interfaces;

namespace TodoList
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:3000")
                                       .AllowAnyHeader()
                                       .AllowAnyMethod(); ;
                                  });
            });
            string connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddMvc();
            services.AddDbContext<TodoListContext>(options =>
                options.UseSqlServer(connection));
            services.AddTransient<IUnitOfWork, UnitOfWork>(provider =>
               new UnitOfWork(provider.GetRequiredService<TodoListContext>()));
            services.AddTransient<IListService, ListService>();
            services.AddTransient<ITaskService, TaskService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
