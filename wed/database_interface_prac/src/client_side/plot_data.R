#############################
##  install packages here  ##
#############################
library(httr)
library(jsonlite)
if (!require("growthrates")) {
  install.packages("growthrates", repos = "http://cran.us.r-project.org")
}


if (!require("languageserver")) {
  install.packages("languageserver", repos = "http://cran.us.r-project.org")
}


#############################
##  define functions here  ##
#############################



## make function to get experiment-ids
get_experiment_ids = function() {
  url = 'http://localhost:3000/api/experiment-ids/'
  request = GET(url)
  response = content(request, as = 'text', encoding = 'UTF-8')
  experiment_ids = fromJSON(response)
  return(experiment_ids)
}

## get datapoints for a given experiment-id
 get_datapoints = function(experiment_id){ 
    url = paste0("http://localhost:3000/api/datapoints/", experiment_id)
    request = GET(url) 
    response = content(request, as = 'text', encoding = 'UTF-8')
    data = fromJSON(response)
    return(data)
    }

## funxtion to return a plot for a given experiment-id
plot_experiment = function(experiment_id) {
  exp = datapoints[[experiment_id]]
  p = plot(exp$time, exp$cfu)
  return(p)}

#############################
## main script starts here ##
#############################

## get experiment-ids
experiment_ids_df = get_experiment_ids()

## make list with key as experiment-id and value as datapoints
datapoints = sapply(experiment_ids_df$experiment_id,
                    get_datapoints,
                    simplify = FALSE)


## loop through experiment_ids and plot each experiment
for (exp in names(datapoints)) {
  plot_experiment(exp)
}


