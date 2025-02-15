# "needs" instead of "library" or "require" for r-script
needs(growthrates)

attach(input[[1]])

fit = fit_spline(times, cfus)

# # Extract the growth coefficient
# growth_coef = coef(fit)['mumax']

# # Return the growth coefficient
# growth_coef

# Calculate the mean of the 'cfus' vector
mean_cfus = mean(cfus)

# Print the result to standard output
mean_cfus