# install packages
library(httr)
library(jsonlite)

# make API call
experiment = 'ds001a3'
request = GET(paste0('http://localhost:3000/api/experiments/', experiment))
response = content(request, as = 'text', encoding = 'UTF-8')

df = fromJSON(response)
print(df)