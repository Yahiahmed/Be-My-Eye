//Enhanced with Dated Symptoms and Symptom Tips

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
const tipsByWeek = {
  1: "Focus on taking 400-800 mcg of folic acid daily. Start tracking your menstrual cycle if you're not already pregnant.",
  2: "Ovulation typically occurs this week. Maintain a healthy diet rich in fruits, vegetables, and whole grains.",
  3: "If conception occurred, the fertilized egg is traveling to the uterus. Avoid alcohol, smoking, and limit caffeine.",
  4: "Implantation occurs. You might experience light spotting. Continue prenatal vitamins and stay hydrated.",
  5: "Baby's heart begins to form. You may experience fatigue and breast tenderness. Rest when needed.",
  6: "Morning sickness may begin. Try eating small, frequent meals and ginger products to help with nausea.",
  7: "Baby's brain is developing rapidly. Include omega-3 fatty acids in your diet from sources like walnuts and flaxseeds.",
  8: "First prenatal visit typically occurs around now. Start doing gentle exercises like walking or prenatal yoga.",
  9: "Your uterus is expanding. Wear comfortable clothing and consider starting a pregnancy journal.",
  10: "Baby's vital organs are forming. Avoid hot tubs and saunas which can raise body temperature too much.",
  11: "Nausea may start to improve. Focus on protein-rich snacks to maintain energy levels throughout the day.",
  12: "Risk of miscarriage decreases significantly. Share your news if you feel ready! Start doing Kegel exercises.",
  13: "Second trimester begins! Energy often returns. Consider maternity clothes as your waistline expands.",
  14: "Baby starts making facial expressions. Practice good posture to accommodate your growing belly.",
  15: "You might feel baby's first movements (quickening). Stay active with swimming or prenatal fitness classes.",
  16: "Increased blood flow may cause nosebleeds. Use a humidifier and saline nasal spray for relief.",
  17: "Baby's skeleton is hardening from cartilage to bone. Ensure adequate calcium intake from dairy or leafy greens.",
  18: "Time for the anatomy scan ultrasound! Start sleeping on your side to improve circulation.",
  19: "Linea nigra (dark line on belly) may appear. Wear sunscreen as skin becomes more sensitive to sun.",
  20: "Halfway there! Practice relaxation techniques and consider childbirth education classes.",
  21: "You may feel hungrier. Focus on nutrient-dense snacks like nuts, yogurt, and whole grain crackers.",
  22: "Baby can now hear your voice. Talk, sing, or read to your baby to start bonding.",
  23: "Swelling in feet/ankles may occur. Elevate feet when possible and stay hydrated.",
  24: "Gestational diabetes screening occurs. Continue eating balanced meals with complex carbohydrates.",
  25: "Baby's hands are fully developed. Practice hand massage to relieve carpal tunnel symptoms.",
  26: "Third trimester nears. Start planning maternity leave and preparing your birth plan.",
  27: "Baby's eyes open and close. Reduce screen time before bed to improve sleep quality.",
  28: "Glucose challenge test occurs. Monitor fetal movement patterns daily.",
  29: "Baby is growing rapidly. Eat small, frequent meals to avoid heartburn and indigestion.",
  30: "Braxton Hicks contractions may begin. Practice breathing techniques for labor.",
  31: "Baby's brain is developing quickly. Include choline-rich foods like eggs in your diet.",
  32: "Baby may settle into head-down position. Consider prenatal massage for back relief.",
  33: "Frequent urination returns as baby drops. Do pelvic tilts to relieve pressure.",
  34: "Baby's immune system develops. Get flu shot if you haven't already (approved by your doctor).",
  35: "Lightning crotch may occur. Use a pregnancy pillow for better sleep support.",
  36: "Baby may engage into pelvis. Pack your hospital bag and install car seat.",
  37: "Full term begins! Watch for signs of labor like mucus plug release or water breaking.",
  38: "Nesting instinct may kick in. Rest when possible and save energy for labor.",
  39: "Cervix begins to dilate. Practice relaxation techniques and perineal massage.",
  40: "Due date week! Stay calm, walk daily, and trust your body's wisdom.",
  41: "If still pregnant, discuss induction options with your provider. Stay patient!",
  42: "Post-date pregnancy requires close monitoring. Follow your doctor's recommendations."
};
const SYMPTOM_TIPS = {
  nausea: "Try ginger tea, small frequent meals, and avoid greasy foods. Vitamin B6 might help (consult your doctor).",
  fatigue: "Rest when possible, prioritize sleep, and eat iron-rich foods to combat pregnancy fatigue.",
  headache: "Stay hydrated, practice relaxation techniques, and consider a cool compress. Avoid aspirin.",
  "back pain": "Practice good posture, use pregnancy pillows, and try prenatal yoga or swimming.",
  "leg cramps": "Stretch before bed, stay hydrated, and ensure adequate calcium/magnesium intake.",
  heartburn: "Eat smaller meals, avoid spicy/fatty foods, and don't lie down right after eating.",
  swelling: "Elevate feet when possible, stay hydrated, and reduce salt intake. Contact doctor if sudden.",
  bleeding: "IMPORTANT: Contact your healthcare provider immediately for any bleeding during pregnancy.",
  dizziness: "Rise slowly, stay hydrated, and eat regular meals. Avoid standing for long periods.",
  constipation: "Increase fiber intake, drink plenty of water, and stay active with walking.",
  "breast tenderness": "Wear a supportive bra, try warm compresses, and avoid caffeine which can worsen tenderness.",
  insomnia: "Establish a bedtime routine, limit screen time before bed, and try pregnancy pillows.",
  "round ligament pain": "Change positions slowly, support belly when moving, and try gentle stretching.",
  "shortness of breath": "Practice good posture, sleep propped up, and pace activities. Mention to your doctor.",
  "food aversions": "Eat what you can tolerate, try cold foods (often less smelly), and focus on nutrition.",
  "frequent urination": "Limit fluids before bedtime, but stay hydrated. Do Kegel exercises to strengthen pelvic floor.",
};

const ALERT_SYMPTOMS = ['bleeding', 'severe headache', 'blurred vision', 'severe abdominal pain', 'fever', 'reduced fetal movement'];



export default function App() {
  const [week, setWeek] = useState(1);
  const [symptom, setSymptom] = useState('');
  const [symptomLog, setSymptomLog] = useState([]);
  const [tip, setTip] = useState(tipsByWeek[1]);
  const [symptomTip, setSymptomTip] = useState('');
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventText, setEventText] = useState('');

  useEffect(() => {
    setTip(tipsByWeek[week] || 'No tip available for this week.');
  }, [week]);

  const logSymptom = () => {
    if (symptom.trim() === '' || !selectedDate) return;
    
    const newEntry = {
      date: selectedDate,
      symptom: symptom.trim().toLowerCase(),
      id: Date.now().toString()
    };
    
    setSymptomLog(prev => [...prev, newEntry]);
    
    // Find symptom-specific tip
    const matchedSymptom = Object.keys(SYMPTOM_TIPS).find(s => 
      newEntry.symptom.includes(s)
    );
    setSymptomTip(matchedSymptom ? SYMPTOM_TIPS[matchedSymptom] : "Monitor this symptom and contact your doctor if it persists or worsens.");
    
    // Check for alert symptoms
    if (ALERT_SYMPTOMS.some(alertSymptom => newEntry.symptom.includes(alertSymptom))) {
      Alert.alert(
        '⚠ Important Alert', 
        'This symptom may require immediate medical attention. Please contact your healthcare provider.',
        [{ text: 'OK', style: 'cancel' }]
      );
    }
    
    setSymptom('');
  };

  const addEvent = () => {
    if (!selectedDate || eventText.trim() === '') return;
    setEvents(prev => ({
      ...prev,
      [selectedDate]: [
        ...(prev[selectedDate] || []),
        eventText
      ]
    }));
    setEventText('');
  };

  const getSymptomsForSelectedDate = () => {
    return symptomLog.filter(entry => entry.date === selectedDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>PreggyPal - Pregnancy Companion</Text>

      <Text style={styles.label}>Enter your current week of pregnancy:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(week)}
        onChangeText={(text) => setWeek(Number(text))}
      />

      <View style={styles.tipContainer}>
        <Text style={styles.tipHeader}>Week {week} Tip:</Text>
        <Text style={styles.tipText}>{tip}</Text>
      </View>

      <Text style={styles.sectionHeader}>📅 Symptom Tracker</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...Object.keys(events).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: '#4ECDC4' };
            return acc;
          }, {}),
          ...symptomLog.reduce((acc, entry) => {
            acc[entry.date] = { ...acc[entry.date], marked: true, dots: [
              ...(acc[entry.date]?.dots || []),
              { key: 'symptom', color: '#FF6B6B' }
            ]};
            return acc;
          }, {}),
          [selectedDate]: { selected: true, selectedColor: '#4ECDC4' }
        }}
        theme={{
          selectedDayBackgroundColor: '#4ECDC4',
          todayTextColor: '#FF6B6B',
          arrowColor: '#4ECDC4',
        }}
      />

      <Text style={styles.label}>Log symptoms for {selectedDate}:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., nausea, back pain, headache"
        value={symptom}
        onChangeText={setSymptom}
      />
      <Button title="Log Symptom" onPress={logSymptom} color="#FF6B6B" />

      {symptomTip ? (
        <View style={styles.symptomTipContainer}>
          <Text style={styles.symptomTipHeader}>Symptom Advice:</Text>
          <Text style={styles.symptomTipText}>{symptomTip}</Text>
        </View>
      ) : null}

      {getSymptomsForSelectedDate().length > 0 && (
        <View style={styles.symptomsContainer}>
          <Text style={styles.label}>Symptoms logged on {selectedDate}:</Text>
          <FlatList
            data={getSymptomsForSelectedDate()}
            renderItem={({ item }) => (
              <View style={styles.symptomItem}>
                <Text style={styles.symptomText}>• {item.symptom}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}

      <Text style={styles.sectionHeader}>📅 Appointment Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Doctor appointment, Ultrasound scan"
        value={eventText}
        onChangeText={setEventText}
      />
      <Button title="Add Event" onPress={addEvent} color="#4ECDC4" />

      {selectedDate && events[selectedDate] && (
        <View style={styles.eventsContainer}>
          <Text style={styles.label}>Events on {selectedDate}:</Text>
          {events[selectedDate].map((e, i) => (
            <Text key={i} style={styles.eventItem}>• {e}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF9F9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF6B6B',
    textAlign: 'center',
  },
  sectionHeader: {
    marginTop: 30,
    marginBottom: 15,
    fontWeight: '600',
    fontSize: 18,
    color: '#4ECDC4',
  },
  label: {
    marginTop: 15,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFC8C8',
    padding: 12,
    marginTop: 8,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  tipContainer: {
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: '#F0F9FF',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4ECDC4',
  },
  tipHeader: {
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 5,
  },
  tipText: {
    color: '#555',
    lineHeight: 20,
  },
  symptomTipContainer: {
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: '#FFF0F5',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  symptomTipHeader: {
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 5,
  },
  symptomTipText: {
    color: '#555',
    lineHeight: 20,
  },
  symptomsContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FFF5F5',
    borderRadius: 10,
  },
  symptomItem: {
    paddingVertical: 8,
  },
  symptomText: {
    color: '#666',
    fontSize: 16,
  },
  eventsContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#F6FFF6',
    borderRadius: 10,
  },
  eventItem: {
    paddingVertical: 5,
    color: '#4A8FE7',
  }
});