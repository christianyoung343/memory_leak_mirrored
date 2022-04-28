Capstone final project created by Michael Bauer, Christian Young, Kody Kimberl, and Andrew Palmer

The directory tree for this project looks as follows:

                      memory_leak
                          |
                          --- memory_leak
                                |
                                --- src
                                      |
                                      --- app, assets, environments, models, test_helpers

Main root directory will contain a Github workflow that will run the project tests, a package.json file that will house the needed dependencies, a .gitignore, and this Readme file.

The **memory_leak** directory houses the Angular project. Once inside that directory you will see all the TypeScript configurations, Firebase configurations, Firestore configurations, a package.json file that has all the other dependencies needed for Angular and Firebase/Firestore.

The **src** directory from inside the **memory_leak** directory houses the **app** directory which is where all the components, services, test files, enviroments, and models are for the project.

The **app** directory contains two main directories **containers** and **services** as well as other important angular components used throughout the project. 

**containers** houses angular components. Each Angular compononet contains its own CSS, TypeScript, HTML, and test file.

**services** houses the service files used for communications between the components and Firebase/Firestore

All reports, worklogs, and instructions are in the **documentation** directory
