# Errata for *Essential Angular for ASP.NET Core MVC*

If you install .NET Core SDK 2.1.x, the `dotnet new` command in Listing 3-7 of the update for Angular 5 and ASP.NET Core 2 won't add a `bower.json` file to the project.

The `bower.json` file is used to add the Bootstrap package to the project so that HTML content can be easily styled. 

To create the file, open the project in Visual Studio, right-click on the SportsStore project item in the Solution Exporer, select `Add` > `New Item` from the popup menu and select the `Bower Configuration File` item template, which can be found in the `ASP.NET Core` > `Web` > `General` category. Click the `Add` button to create the `bower.json` file (and the hidden `.bowerrc` file that ensures packages are installed in the `wwwroot/lib` folder) and add the packages shown in Listing 3-16. Save the file and Visual Studio will use Bower to install Bootstrap and the packages it depends on.

Thanks to Roman Korecky for reporting this problem.
---

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
