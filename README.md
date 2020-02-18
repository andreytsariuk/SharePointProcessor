
# File Downloader
This is a sample of code of organization and management the file processing service with integration more than one other HTTP file storage like a SharePoint or S3
It presents a way of data organization and management over the whole process life-cycle
The detailed information about code structure and responsibilities can be found below


Also, the following software should be installed:

* **[NodeJS](http://nodejs.org)** v. 12.x
* **[eslint](https://www.npmjs.com/package/eslint)** v.6.0.1 


## NPM scripts
All script placed in **[package.json](./package.json)**

* ```npm install``` - install all dependencies
* ```npm start``` - starts application
* ```npm run lint``` - runs a eslint linter using local **[.eslintrc.js](./.eslintrc.js)** configurations file

## Code Structure

#### [bin](./bin) folder
This folder contains the main service script that runs by start command
#### [config](./config) folder
This folder contains all configuration for the project. 
There should be placed configuration files for other environments such as **production.json** nad **staging.json**
#### [docs](./docs) folder
This folder contains documentation for the project. Screenshots, diagrams, charts, etc. 
Also, in this folder stores the **[Pull request Template](./docs/pull_request_template.md)**. 
#### [downloads](./downloads) folder
This folder may have some stored run-time data. The content of this folder depends to the process parameters. 
Please, for more information see next topic.
#### [src](./src) folder
This folder contains all data related to the data life-cycle. 
There are:
* **[downloaders](./src/downloaders) folder**
**Downloader** is a structure that are connected to concrete remote http file storage and process files depends on provided config
It's encapsulated from other system and responsible only for Http request and stream processing  
* **[managers](./src/managers) folder**
**Manager** is a structure that manipulate over request. It knows the whole stats about process and it's **Downloaders** and can manipulate with the results of operations.  
* **[processors](./src/processors) folder**
**Processor** is a class that manipulate only with a stream. It knows nothing about requests and etc. It can manage just one stream. 
* **[visualizers](./src/visualizers) folder**
**Visualizer**  is a class only with static methods that uses to visualize a progress from different managers. It just represent a data in user-friendly format. 


## The result of application work

#### Progress:
During the whole process of downloading-processing application will show the statistics in "real-time"
![alt text](./docs/sc_1.png)

#### The result:
The result will be present as a table with separated and aggregated data. 
![alt text](./docs/sc_2.png)


## Environment

#### ENV variables:

##### Share Point integration
* SHAREPOINT_RESOURCE - "postgres://[user_name]:[password]@localhost/[db_name]"
* SHAREPOINT_CLIENT_ID - sharepoint client ID of add-in
* SHAREPOINT_CLIENT_SECRET -  sharepoint client secret of add-in
##### S3 integration (in progress)
* AWS_S3_ACCESS_KEY_ID - Specifies an AWS access key associated with an IAM user or role.
* AWS_SECRET_ACCESS_KEY - Specifies the secret key associated with the access key. This is essentially the "password" for the access key.
* AWS_S3_REGION - The region Of AWS **S3**
##### Custom Configurations
* BATCH_SIZE - **default is 3**. The number of requests that can be run in the same time. 
* LOG_PROGRESS - **default is true**. Uses to control the progress showing
* DOWNLOAD_FILES - **default is false**. Uses to store all processed files in [downloads](./downloads) directory


#### [Config file](./config/default.json) :
* SHAREPOINT.* - describers credentials to SharePoint storage.
* AWS_S3.* - describers credentials to AWS S3 storage.
* OPTIONS.* - describers custom variables of process.

## Building

Install NodeJS submodules:
```
npm install
```


## Running

To start server for **Dev** environment: 
```
npm start
```

## TODO

* Add Unit Test for abstract classes
* Complete integration with S3 service
* Modify and **optimize** the process of progress visualization

