---
title: Covid Restrictions
parent: Examples
---
# Encoding Covid-19 Rules in Blawx

This example was originally published as part of the article [Blawx: A Rules as Code Demonstration](https://law.mit.edu.pub/blawxrulesascodedemonstration/release/1) as part of version 2.0 of the MIT Computational Law Report. It was written on the 0.2.3Alpha version of Blawx, and therefore does not utilize all of Blawx's most recent features, and may not operate properly on the current version of Blawx.

To load your Blawx instance with this example code, [click here](/blawx.html?load=/docs/code/covid.blawx).

## Introduction

This example is used to show what the process of encoding legislation in Blawx looks like in detail, with a small set of legal rules, the Covid-19 rules from the Province of Alberta c. May 2020.

This example will introduce you to the relevant rules, and take you through the process of creating an ontology, encoding the rules with that ontology, and then testing the encoding by creating facts and asking questions about those fact scenarios.

It will also show how when dealing with real-world rules, you will frequently discover problems with the natural language rules that you might not otherwise have noticed, which is how using tools like Blawx for Rules as Code assists in improving the quality of legal texts.

## The Rules

Here’s a summary of the Rules for Obtaining a COVID-19 Test, as I understood them on May 5, 2020:

> You can get tested for Covid-19 if you are symptomatic, you are a close contact of a person who has tested positive, or you are a worker or resident at an outbreak site.
> 
> You are symptomatic if you have one of the following symptoms:
> 
> * Fever
> * Cough (new cough or worsening chronic cough)
> * Shortness of breath or difficulty breathing (new or worsening)
> * Runny nose
> * Stuffy nose
> * Sore throat
> * Painful swallowing
> * Headache
> * Chills
> * Muscle or joint aches
> * Feeling unwell in general, or new fatigue or severe exhaustion
> * Gastrointestinal symptoms (nausea, vomiting, diarrhea or unexplained loss of appetite)
> * Loss of sense of smell or taste
> * Conjunctivitis, commonly known as pink eye
> 
> If you have Fever, Cough, Shortness of Breath or difficulty breathing (new or worsening), a runny nose, or a sore throat, you are legally required to isolate for 10 days or until the symptoms resolve, if it takes longer.
> 
> If you have tested positive for Covid-19, you are required to isolate for 10 days or until the symptoms resolve, if it takes longer.
> 
> If you have symptoms, have tested negative, but you have known exposure, you are required to isolate for 14 days.
> 
> If you have symptoms, have tested negative, and you do not have known exposure to the virus, you are not required to isolate.
> 
> If you are a close contact of a person who has tested positive for Covid-19, you are required to isolate for 14 days, or for 10 days after you get symptoms, or until the symptoms resolve, whichever is longer.
> 
> If you return to Alberta from elsewhere, you are required to isolate for 14 days, or for 10 days after you get symptoms, or until the symptoms resolve, whichever is longer.
> 
> You are a close contact of someone if you provide care, live with or have close physical contact without appropriate use of personal protective equipment, or come into direct contact with infectious body fluids from that person.

## Defining an Ontology

Again, the process of encoding in Blawx typically follows three steps. The first is to set out the ontology that will be used to describe the categories, attributes, and objects about which you want to be able to write rules and queries. In this case, people, symptoms, sites, and test results are all categories that will need to be defined.

Here is what the ontology for a Person category might look like:

![Image of Ontology for Person](/docs/img/covid_person_ontology.png "Image of Ontology for Person")

The rest of the ontology is defined below.

![Image of Remaining Ontology](/docs/img/covid_remaining_ontology.png "Image of Remaining Ontology")

When we encoded the rules of Rock, Paper, Scissors in the ontology phase, we described the abstract concept of a “Sign,” and we were also able to talk about the concrete instances of “Rock,” “Paper,” and “Scissors” as well. This was because we know those elements will always be relevant.

In the same way, in the encoding above, “Positive” and “Negative” are defined as objects in the category “Test Results.” The same can be done for the category of Symptoms and the properties of the objects in that category. A portion of that code looks like this:

## Translating the Rules from Text to Blawx

Now that we have the ontology, it is possible to start reconstructing the textual rules into Blawx. Let’s begin with the rule that defines whether a person is entitled to testing.

### Testing Entitlement

By default, an individual would not be entitled to testing, but the entitlement changes under certain circumstances. So we will use Blawx’s ability to make rules that are exceptions to other rules.

![Default No Testing Rule](/docs/img/covid_default_no_testing_rule.png "Default No Testing Rule")

We can now make a rule that sets out that a person is entitled to testing if they are symptomatic, if they have close contact with a person who has tested positive, or if they are associated with an outbreak site.

![Testing Rule](/docs/img/covid_testing_entitlement_rule.png "Testing Rule")

Next, we need to tell Blawx that if the results of these two rules conflict, the “testing_entitlement” rule takes precedence. We do that using the override block.

![Testing Override](/docs/img/covid_override.png "Testing Override")

The above two rules test whether the object “person” is in the category “Person.” As discussed, those types of category checks are good practice, but to keep the rules shorter and easier to read, they will be left out for the remainder of the example code.

### Association with Outbreak Site

Next we can create a rule for “associated with an outbreak site.”

![Associated with Outbreak Rule](/docs/img/covid_associated_with_outbreak_rule.png "Associated with Outbreak Rule")

If we were ever going to be interested in proving, with certainty, that a person was not associated with an outbreak site, we could create a default, and use associated_with_outbreak to override that default. But non-association with an outbreak site is not likely to be important, so we can leave the negative result implied.

### Symptomaticity

Now we need a rule that will define if a person is symptomatic. An aggregate function may be used to get a count of all the symptoms a person has, and if the number is greater than zero, they are symptomatic.

![Symptomaticity Rule](/docs/img/covid_symptomatic_rule.png "Symptomaticity Rule")

### Isolation Requirements

Now we can start writing rules about when a person would be required to isolate. There are two kinds of isolation required: (1) isolation for 10 days (or until symptoms resolve); and (2) isolation for 14 days in the absence of symptoms. This requires us to add two attributes to the “person” object to reflect these two requirements.

![Isolation Attributes](/docs/img/covid_isolation_attributes.png "Isolation Attributes")

People are going to want to be able to get “no” as an answer to the question of “are you required to isolate.” So it is not enough for us to encode the rules for when they are required to isolate; we also need to encode the rules for when people are not required to isolate. This is because Blawx distinguishes between “not knowing that a value is true” and “knowing that a value is false.” Here, we can use Blawx’s override feature to make “no isolation required” the default, and then override that default with the specific exceptions for when isolation is required.

Here is an encoding of the rule that requires isolation for 10 days or until those symptoms resolve. In the original rule, the symptoms are listed. Here, we will instead use the “requires_isolation” attribute of each symptom to determine whether or not it is on the list. This may make it easier to change the list of relevant symptoms without the need to rewrite the rules.

![Serious Symptoms Rule](/docs/img/covid_serious_symptoms_10_days_rule.png "Serious Symptoms Rule")

Here is a rule that specifies what must happen if an individual has tested positive for one of the symptoms that requires isolation for 10 days or until symptoms resolve.

![Positive Test Rule](/docs/img/covid_positive_10_days_rule.png "Positive Test Rule")

Here is an encoding of the rule that exposed symptomatic people who have tested negative still must isolate for 14 days.

![Exposed Symptomatic Negative Rule](/docs/img/covid_exposed_symptomatic_negative_rule.png "Exposed Symptomatic Negative Rule")

Those are the three circumstances in which you can be required to isolate, so they all override the “default_no_isolation” rule. That is made explicit in the following override blocks:

![Isolation Overrides](/docs/img/covid_isolation_overrides.png "Isolation Overrides")

### Exceptions to Exceptions

The next of the rules is interesting. It states that if you are symptomatic, but you have no known exposure and have already tested negative, you are not required to isolate. This rule does not contradict the rule about known exposure, because that rule requires the person to have known exposure. As well, it does not contradict the rule about positive tests because it requires a negative test. However, it does contradict the rule about serious symptoms. This is an exception to an exception. No isolation is required unless you have a serious symptom, in which case it is required; unless you also have no known exposure and a negative test result, in which case it is not required again. So, we will encode this rule as an exception to the requirement to isolate for 10 days if you have serious symptoms.

![Unexposed Symptomatic Rule](/docs/img/covid_unexposed_symptomatic_negative_rule.png "Unexposed Symptomatic Rule")

Note that with an encoding tool that does not allow you to write exceptions (which is most of them), you would need to combine the default, the exceptions to the default, and the exceptions into a single decision tree structure or rule. This reformulation of the source rules will work in obtaining the right answers, but masks certain knowledge the subject matter expert knows about the rules. That masking makes it more difficult to determine if and how the code needs to change later, when the rules change.

### Close Contacts

We need a rule setting out whether a person is a close contact of another person. Here’s that rule:

![Close Contacts Rule](/docs/img/covid_close_contact_rule.png "Close Contacts Rule")

### An Interpretation Challenge

Now, we have two rules left. The first is: if you are a close contact of a person who has tested positive for COVID-19, you are either required to isolate for 14 days, or for 10 days after you get symptoms, or until your symptoms resolve, whichever is longer. The second is: if you return to Alberta from elsewhere, you are required to isolate for 14 days, or for 10 days after you get symptoms, or until the symptoms resolve, whichever is longer.

We already have a rule that states if you have shown symptoms, you are required to isolate for 10 days or until the symptoms resolve, whichever is longer. Do the parts of these rules covering symptoms differ from that conclusion? Maybe, if we interpret these two rules as referring to “any symptoms, even symptoms that would not usually require isolation.” We will assume that was the intent.

Each rule also has two different possible conclusions. Either you are required to isolate for 14 days, or you are required to isolate for 10. So what do we do?

We have a few options. We can either (1) implement each rule as two rules; or (2) implement both together as three rules. In the latter scenario, the rules would outline two rules for the two different reasons that you might need to isolate for 14 days, and a third for the event that if you have to isolate for 14 days, but then become symptomatic and you need to isolate for 10.

Three would seem better than four for the sake of simplicity, but four is the better option for few reasons. The first is that reformulating into three rules would suggest that the third rule applies to any other reason that people might be required to isolate for 14 days, such as when they are symptomatic but have tested negative and have known contacts. Another reason is that one of these rules could be changed without changing the other one, in which case we would need to break the third encoded rule in half anyway.

In this case, we are forced to take what looks like one rule and turn it into two. That is rather dangerous to the one-to-one relationship between code and rules that we are trying to maintain. One way to address that concern is by using comments. Comments can be added to the encoded rules to indicate that they refer to the same source rule. In future versions of Blawx, I hope to be able to navigate directly from the text of the rule to relevant encodings of the same section, and back, using a similar technique.

It is also not perfectly clear whether the requirement to isolate for 10 days and the requirement to isolate for 14 days are mutually exclusive. The use of the word “or” seems to suggest only one, but “whichever is longer” might be read as including the 14 days in the options. If you return to Alberta on day 1, you get symptoms on day 2, they resolve on day 5, can you leave isolation on day 11, or do you have to wait for day 14, because it is “longer”?

That is exactly the type of problems that encoding rules as they are being drafted would reveal. The Rules as Code approach makes rules easier to understand and implement, because they can be clarified early. For the purpose of this demonstration, I will proceed as if both isolation requirements can apply at the same time.

### Isolation upon Return to Alberta

The first half of the “returning to Alberta” rule looks like this:

![Isolation on Return Rule](/docs/img/covid_return_to_alberta_rule.png "Isolation on Return Rule")

This rule does not include a requirement that the person not be symptomatic, because that would make the two rules mutually exclusive. Here’s what the second half of the rule looks like:

![Symptomatic Return Rule](/docs/img/covid_return_10_rule.png "Symptomatic Return Rule")

Both rules override the default that no isolation is required. So, we will add in the override blocks to make that explicit.

![Return Overrides](/docs/img/covid_return_overrides.png "Return Overrides")

### Isolation on Positive Test in Close Contact

Similarly, here are the two rules implementing the requirements about close contacts.

![Close Positive Rule](/docs/img/covid_close_positive_14_rule.png "Close Positive Rule")

![Close Symptomatic Rule](/docs/img/covid_close_positive_symptomatic_10_rule.png "Close Symptomatic Rule")

On this last rule you can see what the comment looks like while minimized.

As both rules override the default rule that no isolation is required, we will explicitly identify them as exceptions to the default.

![Close Positive Overrides](/docs/img/covid_close_positive_overrides.png "Close Positive Overrides")

### Missing Pieces

If you were paying close attention, you may have noticed two things that have not been addressed in the rule encoding. There is no definition for what counts as a “known contact,” and there are some unresolved conflicts, specifically related to negative conflicts after traveling.

First, it is possible that a “known contact” may be defined elsewhere in the source rules, and it was simply missed during the review process. So this may not be an error on the part of the drafters of the rule and may be an error in the research undertaken in reviewing the rule. In any case, if it is a drafting error, it is just the type of drafting error that the Rules as Code approach makes more obvious.

Second, in relation to unresolved conflicts, there is a default (no isolation required), which can be overridden by having serious symptoms (10 days isolation required), which can in turn be overridden by having a negative test result (no isolation required). On the other hand, we also have two rules that stipulate that people who have either traveled outside of Alberta or have had known contacts and become symptomatic, isolation of 10 days is required. That rule clearly overrides the default, but it does not say whether it is superior or inferior to the rule about a negative test result.

We will not try to resolve that issue in our encoding, but count it among the things we might have noticed had we been using Rules as Code to draft these requirements.

## Encoding Facts and Queries

Now that we have written the code, we can encode some fact scenarios and determine whether or not the code is working as it should. Let’s start with the simplest case. There is a person. If we know nothing else, is that person entitled to testing, or required to isolate?

We start with setting out the facts.

![Facts 1](/docs/img/covid_facts.png "Facts 1")

Now, we need to ask whether Bob is entitled to testing, or required to isolate.

![Query 1](/docs/img/covid_query.png "Query 1")

If you use “Run Blawx Code” command, you will get the following answer:

![Response 1](/docs/img/covid_answer.png "Answer 1")

Remember that for a search query, the “answer” is always to the question “do any records exist that satisfy this search,” and then it provides the details. So the “yes” on the top line means only that Blawx can answer the question. The actual answer is below. The details are that Bob is not entitled to testing, and he is not required to isolate, so the defaults seem to be working fine.

Let’s see if we can make Bob a person who is entitled to testing because he is short of breath.

![Query 2](/docs/img/covid_query2.png "Query 2")

Running this code, we get the answer:

![Answer 2](/docs/img/covid_answer2.png "Answer 2")

Bob is now entitled to get testing. Let’s assume that he does and tests positive.

![Facts 3](/docs/img/covid_facts3.png "Facts 3")

The answer is:

![Answer 3](/docs/img/covid_answer3.png "Answer 3")

As he has tested positive, the exception to the default rule applies and Bob is now required to isolate for 10 days. Now, let’s try something more difficult. Let’s say that Bob lives with Jane, Bob just came from out of province, Jane provides care to Ted, who has tested positive, and Jane has a stuffy nose (a minor symptom not requiring isolation on its own). Finally, Bob and Jane both live with Austin. Let’s ask what conclusions the system draws.

![Facts 4](/docs/img/covid_facts4.png "Facts 4")

We modify the question block to look like this:

![Query 4](/docs/img/covid_query4.png "Query 4")

What this means, in effect, is that you are asking Blawx to find all combinations of a “person” object and the relevant three values that it knows based on information in the database. When we run the code, we get the following answers:

![Answer 4](/docs/img/covid_answer4.png "Answer 4")

We can see Austin is not entitled to testing, and does not need to isolate. Bob is not entitled to testing, but because he has returned from out of province, he is required to isolate for 14 days. Jane is entitled to testing because she has had close contact with a person who has tested positive and has exhibited symptoms herself. She is also required to isolate 10 days because she is symptomatic (even though the symptoms alone do not require isolation) and has had close contact with a person who tested positive. This is one of the examples in which both requirements might apply at the same time. Ted is not entitled to testing, but he is required to isolate for 10 days because he tested positive.

## Conclusion

Hopefully this has helped illustrate the process and benefits of encoding in Blawx. You start by encoding an ontology, use that ontology to encode the rules themselves, and then test those rules using facts and queries. The encoding makes the rules better, because it surfaces problems, and the testing makes the rules better by ensuring they behave as expected. Plus, applications running off of this code are very easy to update when the rules change.