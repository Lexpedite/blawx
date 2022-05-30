# This is a simple command-line chat interface powered by a Blawx encoding
# To Do:
# 1. Make it so that the interface is aware of things that were added to
#    the ontology on the server.
# 2. Have the interface order its questions so it isn't asking for objects
#    that haven't been set yet.
# 3. Have the interface display the options when we know what they are.
# 4. Validate responses for data types?
# 5. Have the reasoner try to figure out what questions are relevant.
# 6. Integrate the NLG knowledge into how the information is displayed?
# 7. Turn it into a web app.


import requests
import json
from pprint import pprint

TEST = "http://localhost:8000/2/test/who_wins/"

# Get the Ontology
ontology = requests.get(TEST + "onto/")
ontology_categories = ontology.json()['Categories']
ontology_attributes = ontology.json()['Attributes']
ontology_objects = ontology.json()['Objects']
ontology_values = ontology.json()['Values']

fact_scenario = {}

for c in ontology_categories:
    fact_scenario[c] = {}
    fact_scenario[c]['members_known'] = False
    fact_scenario[c]['attributes_known'] = {}
    for a in ontology_attributes:
        if a['Category'] == c:
            fact_scenario[c]['attributes_known'][a['Attribute']] = False
    fact_scenario[c]['members'] = {}
    # At this point we would need to add the objects and a values from
    # the ontology, and figure out how to deal with them appropriately when
    # collecting data.

finished_categories = []
finished_object_attributes = []
while True: #Start interview loop.
    facts_updated = False
    # print(fact_scenario)
    # Run the query, get relevance
    query_response = requests.post(TEST + "interview/", json.dumps(fact_scenario), headers={'content-type': 'application/json'})
    relevant_categories = query_response.json()['Relevant Categories']
    relevant_unfinished_categories = [c for c in relevant_categories if c not in finished_categories]
    # If no answers
    if query_response.json()['Answers'] == []:
        # For each relevant unfinished category
        for ruc in relevant_unfinished_categories:
            pass
            # For each object in the category
            for (obj_name,obj_values) in fact_scenario[ruc]['members'].items():
                # For each relevant unfinished attribute for the object
                relevant_attributes = query_response.json()['Relevant Attributes']
                # An attribute is relevant with regard to an object if
                # it is relevant generally or specifically,
                generally_relevant_attribute_names = [ra['Attribute'] for ra in relevant_attributes if len(ra) == 1]
                specifically_relevant_attribute_names = [ra['Attribute'] for ra in relevant_attributes if 'Object' in ra and ra['Object'] == obj_name]
                relevant_attributes = [att['Attribute'] for att in ontology_attributes if att['Category'] == ruc and (att['Attribute'] in generally_relevant_attribute_names or att['Attribute'] in specifically_relevant_attribute_names)]
                # its values are not finished being collected.
                relevant_unfinished_attributes = [ra for ra in relevant_attributes if fact_scenario[ruc]['members'][obj_name][ra]['values_known'] == False]
                for attribute_name in relevant_unfinished_attributes:
                    # State the known values for the attribute for the object
                    print("The known values for the " + attribute_name + " attribute of object " + obj_name + " are:")
                    if len(fact_scenario[ruc]['members'][obj_name][attribute_name]['values']):
                        print(', '.join(fact_scenario[ruc]['members'][obj_name][attribute_name]['values']))
                    else:
                        print("none")
                    # Ask if the user wants to add a value
                    add_value = input("Do you want to add a value to this attribute? ")
                    # If yes
                    if add_value == "yes":
                        # Ask for the value
                        new_value = input("What value do you want to add? ")
                        # Add the value
                        fact_scenario[ruc]['members'][obj_name][attribute_name]['values'].append(new_value)
                        # Mark facts updated
                        facts_updated = True
                    else:
                        # mark the attribute as complete for that object
                        fact_scenario[ruc]['members'][obj_name][attribute_name]['values_known'] = True
                    if facts_updated:
                        break
                if facts_updated:
                    break
            if facts_updated:
                break
            # State known objects in the category
            print("The known objects in the category " + ruc + " are:")
            if len(fact_scenario[ruc]['members'].items()):
                print(', '.join([k for (k,v) in fact_scenario[ruc]['members'].items()]))
            else:
                print("none")
            # Ask if the user wants to add to the category
            answer = input("Do you want to add an object to the category " + ruc + "? ")
            # if Yes
            if answer == "yes":
                # Collect the name of an object
                new_object = input("What is the name of the new object in the category " + ruc + "? ")
                # Add the object to the category
                fact_scenario[ruc]['members'][new_object] = {}
                for att in ontology_attributes:
                    if att['Category'] == ruc:
                        fact_scenario[ruc]['members'][new_object][att['Attribute']] = {'values': [], 'values_known': False}
                # mark facts updated
                facts_updated = True
            else:
                # mark the category as complete
                finished_categories.append(ruc)
                fact_scenario[ruc]['members_known'] = True
            # if facts updated, break for
            if facts_updated:
                break
        if facts_updated: #check again for answers, relevance
            continue
        else: # there are no relevant inputs
            break #stop asking for inputs
    else: # There is an answer
        break # stop collecting inputs
# Display the answer
if len(query_response.json()['Answers']):
    print("One or more valid answers were found:")
    answer_count = 1
    for a in query_response.json()['Answers']:
        print("Answer " + str(answer_count))
        for (k,v) in a['Variables'].items():
            print(k + ": " + v)
        print("Explanation:")
        pprint(a['Models'])
        answer_count += 1
else:
    print("There is no answer that satisfies the query.")