# Errata for *Essential Angular for ASP.NET Core MVC*

You may see the following error if you install the .NET Core 2.0 SDK and then try to create a project using the command in Listing 3-7:

    Error: Invalid parameter(s):
        --framework netcoreapp1.1
            'netcoreapp1.1' is not a valid value for --framework (Framework).
    Run dotnet new mvc --help for usage information.
    See https://aka.ms/dotnet-install-templates to learn how to install additional template packs.

This is a problem caused by the way that Microsoft manages the templates that are used to create projects. To work around this problem, create a file called `global.json` with the following content:

    {
    "sdk": {
        "version": "1.1.0"
        }
    }

Run the command in Listing 3-7 again and the project will be created using .NET Core version 1.1, which is the version used for the examples in the book.
