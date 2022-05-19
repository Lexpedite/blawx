# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionAddObject(Action):

    def name(self) -> Text:
        return "action_add_object"
    
    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text="Adding object...")

        return []

class ActionListObjects(Action):

    def name(self) -> Text:
        return "action_list_objects"
    
    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text="Listing objects...")

        return []

class ActionGetObject(Action):

    def name(self) -> Text:
        return "action_get_object"
    
    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text="Displaying object...")

        return []

class ActionDeleteObject(Action):

    def name(self) -> Text:
        return "action_delete_object"
    
    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text="Deleting object...")

        return []

class ActionAddAttribute(Action):

    def name(self) -> Text:
        return "action_add_attribute"
    
    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text="Adding attribute...")

        return []

class ActionDeleteAttribute(Action):

    def name(self) -> Text:
        return "action_delete_attribute"
    
    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text="Deleting attribute...")

        return []

class ActionListCategories(Action):

    def name(self) -> Text:
        return "action_list_categories"
    
    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text="Listing categories...")

        return []

class ActionListAttributes(Action):

    def name(self) -> Text:
        return "action_list_attributes"
    
    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text="Listing attributes...")

        return []

