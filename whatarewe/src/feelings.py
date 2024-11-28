import pandas as pd
from textblob import TextBlob
import random

# Define phrases and their corresponding ranges
phrases = {
    (0, 20): ("Just lose the number already", "🖤"),
    (21, 40): ("You’re cooked", "🩶"),
    (41, 60): ("Tread carefully", "💛"),
    (61, 80): ("Think about it first", "💖"),
    (81, 100): ("Go for it!", "❤️")
}

# Function to analyze text and calculate reciprocated feelings %
def analyze_conversation(conversation):
    # Analyze sentiment polarity using TextBlob
    polarity = TextBlob(conversation).sentiment.polarity
    
    # Scale polarity (-1 to 1) to "Reciprocated Feelings %" (0 to 100)
    feelings_percent = int((polarity + 1) * 50)
    
    # Map the feelings percent to a phrase and heart type
    for range_tuple, (phrase, heart) in phrases.items():
        if range_tuple[0] <= feelings_percent <= range_tuple[1]:
            return feelings_percent, phrase, heart

# Function to run the application
def main():
    print("Welcome to the Reciprocated Feelings Analyzer!")
    
    # Allow the user to select a desired outcome first
    outcomes = ["Friends", "More than friends", "Dating", "MARRY ME"]
    print("Select your desired outcome:")
    for i, outcome in enumerate(outcomes, 1):
        print(f"{i}. {outcome}")
    
    choice = int(input("\nEnter the number of your choice: "))
    if 1 <= choice <= len(outcomes):
        chosen_outcome = outcomes[choice - 1]
        print(f"\nYou chose: {chosen_outcome}")
    else:
        print("\nInvalid choice. Exiting.")
        return
    
    # Ask for the conversation
    print("\nNow paste your conversation below (press Enter twice to submit):")
    conversation = []
    while True:
        line = input()
        if line == "":
            break
        conversation.append(line)
    conversation = "\n".join(conversation)
    
    # Analyze the conversation
    feelings_percent, phrase, heart = analyze_conversation(conversation)
    
    # Display results
    print("\nResults:")
    print(f"Desired Outcome: {chosen_outcome}")
    print(f"Reciprocated Feelings %: {feelings_percent}%")
    print(f"Phrase: {phrase}")
    print(f"Heart: {heart}")

# Run the application
if __name__ == "__main__":
    main()
