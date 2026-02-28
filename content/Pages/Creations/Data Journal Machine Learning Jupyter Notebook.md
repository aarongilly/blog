---
tags:
  - creation
  - creation/coding
date: 2025-04-20
---
Machine Learning Project.

Submitted as part of a machine learning class in my pursuit of a Masters in Data Analytics through NW Missouri State University.

> [!note] Github repo: https://github.com/aarongilly/ml_regression_gillespie

![[pages_data_journal_ML.png]]
## The most relevant part

> What does this say about life? What does this say about machine learning?
> 
> The data features most highly correlated with `satisfaction` were surprising.
> 
> 1. `active_calories` - from my Oura Ring, [their documentation](https://cloud.ouraring.com/v2/docs#operation/Single_daily_activity_Document_v2_usercollection_daily_activity__document_id__get) says this is a measure of "Active calories expended"
> 2. `steps` - also Oura Ring, "Total number of steps taken", which would correlate highly with #1
> 3. `satisfaction_running_avg` - looking at the previous 3 days to make your prediction about today
> 4. `work_status_endocded` - weekends are generally more satisfying
> 5. `health` - my subjective health rating, 1 to 10, made at the same time I do the `satisfaction` rating
> 
> All of those were positively correlated with increased `satisfaction`. Interestingly, **nothing** in the top 5 has to do with sleep, actual _workouts_ (as opposed to generic activity), and/or social outings.
> 
> The predictive power considering the strongest _negative_ correlates were lower than the positive correlates. The most negatively correlated features were:
> 
> 6. `temperature_deviation` - from my Oura Ring, "Temperature deviation in degrees Celsius." - I believe during sleep, indicating some fluntuation in health and metabolism.
> 7. `treatments` - indicating some form of medication or physical therapy took place
> 8. `pains` - indicating something hurt enough to warrant tracking, almost 1:1 with `treatments`
> 9. `lift_volume_lbs` - one of the most surprising contraindications here, when I lift MORE, I feel less satisfied
> 10. `awake_time` - from my Oura Ring, time spent _awake_ while trying to sleep the night before
> 
> [!tldr] If you want to be more satisfied: try to move more and work and be sick less...  
> ...but there's not much you can do to "hone" `satisfaction` levels using what's tracked here.
> 
> You can track dozens of datapoints about your life, but that doesn't make your subjective **life satisfaction** a highly-preditable phenomenon.
> 
> Machine Learning is an **awesome technique**. It can be used to reliably predict the weather many days from now using phenomenon observed today... but it's not capable of devining results in a low-vailidity environment, such as the highly abstract nature of life satisfaction.