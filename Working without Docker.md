# Working without Docker


I use Docker in this book to avoid problems with database configuration, which are the most common issues that readers report. But running SQL Server using Docker and Visual Studio can easily require 8GB of RAM and result in a frustrating development experience if you don't have plenty of free RAM available.

Using Docker isn't a requirement for working with Angular and ASP.NET Core MVC and you can follow the examples in the book without using a container with a few adjustments. 

First, in Listing 4-3, change the connection string to point to a database outside of a container. If you are using Windows, the LocalDB feature is a good choice and is installed as part of the Visual Studio workload for .NET Core development. Here is an example of a suitable connection string for LocalDB, which you can use in the appsettings.json file:

    {
        "Logging": {
            "IncludeScopes": false,
            "LogLevel": {
                "Microsoft.EntityFrameworkCore": "Information",
                "Microsoft.AspNetCore.NodeServices": "Information",
                "Default": "Warning"
        }
    },
        "Data": {
            "Products": {
                "ConnectionString": "Server=(localdb)\\MSSQLLocalDB;Database=SportsStore;Trusted_Connection=True;MultipleActiveResultSets=true" 
            }
        }
    }

To reset the database at the start of the chapters, run this command in the project folder to force the removal of the existing database and its contents:

    dotnet ef database drop --force

Start the ASP.NET Core MVC application as normal and you should be able to follow the rest of the examples in each chapter without any other changes.

Adam Freeman, London, August 2017.