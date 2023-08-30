import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AddSchedulePopup from '../components/HomeNavigation/AddSchedulePopup';

// const DAYS_IN_MONTH = 30; // Set the number of days in the month here
const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getCurrentDate = () => {
    const currentDate = new Date();
    return {
      day: currentDate.getDate(),
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
      dayOfWeek: currentDate.getDay(),
    };
};

const generateCalendar = (currentMonth: number, currentYear: number): JSX.Element[] => {
const currentDate = getCurrentDate();
const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
const startingDay = firstDayOfMonth.getDay();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const [showPopup, setShowPopup] = React.useState(false);


const calendar: JSX.Element[] = [];

// Add empty cells for days before the first day of the month
for (let i = 0; i < startingDay; i++) {
    calendar.push(
    <View key={`empty_${i}`} style={styles.dayCell} />
    );
}

const handleDayClick = (day: number) => {
  console.log(`Selected day: ${day}`);
  setShowPopup(true);
};

for (let day = 1; day <= daysInMonth; day++) {
    calendar.push(
    <TouchableOpacity
      key={day}
      style={[
      styles.dayCell,
      day === currentDate.day && currentMonth === currentDate.month && currentYear === currentDate.year
        ? styles.currentDay
        : null,
      ]}
      // onPress={() => console.log(`Selected day: ${day}`)}
      onPress={() => handleDayClick(day)}
    >
      <Text>{day}</Text>
      <AddSchedulePopup isVisible={showPopup} onClose={() => setShowPopup(false)} />
    </TouchableOpacity>
    );
}

return calendar;
};


const HomeNavigation: React.FC = () => {
    const currentDate = getCurrentDate();
    const [selectedMonth, setSelectedMonth] = React.useState(currentDate.month);
    const [selectedYear, setSelectedYear] = React.useState(currentDate.year);
    const [showPickers, setShowPickers] = React.useState(false);
  
    const calendar = generateCalendar(selectedMonth, selectedYear);
  
    const previousMonth = () => {
        setSelectedMonth((prevMonth) => {
            const newMonth = prevMonth === 1 ? 11 : prevMonth - 1;
            if (newMonth === 11) {
                onYearChange(selectedYear - 1)
            }
            return newMonth;
        });
    };
  
    const nextMonth = () => {
        setSelectedMonth((prevMonth) => {
            const newMonth = prevMonth === 11 ? 0 : prevMonth + 1;
            if (newMonth === 0) {
                onYearChange(selectedYear + 1)
            }
            return newMonth;
        });
    };
  
    const onMonthChange = (monthIndex: number) => {
      setSelectedMonth(monthIndex);
    };
  
    const onYearChange = (year: number) => {
      setSelectedYear(year);
    };

    const togglePickers = () => {
        setShowPickers(!showPickers);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={previousMonth}>
            <Text style={styles.navigationButton}>{'< Prev'}</Text>
          </TouchableOpacity>
          <Text style={styles.header} onPress={togglePickers}>
            {`${MONTHS[selectedMonth]} ${selectedYear}`}
          </Text>
            <View style={styles.monthYearPicker}>
                {/* Show pickers only when toggled */}
                {showPickers && (
                    <>
                        <Picker
                            selectedValue={selectedMonth}
                            style={styles.picker}
                            onValueChange={onMonthChange}
                        >
                            {MONTHS.map((month, index) => (
                            <Picker.Item key={index} label={month} value={index} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={selectedYear}
                            style={styles.picker}
                            onValueChange={onYearChange}
                        >
                            {Array.from({ length: 10 }, (_, i) => selectedYear + i).map((year) => (
                            <Picker.Item key={year} label={year.toString()} value={year} />
                            ))}
                        </Picker>
                    </>
                )}
            </View>
          <TouchableOpacity onPress={nextMonth}>
            <Text style={styles.navigationButton}>{'Next >'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendarContainer}>
          {DAYS_OF_WEEK.map((day) => (
            <View key={day} style={styles.dayOfWeekCell}>
              <Text>{day}</Text>
            </View>
          ))}
          {calendar}
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  navigationButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  monthYearPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',  // Move to the middle of the screen vertically
    left: 0,     // Center it horizontally
    right: 0,    // Center it horizontally
    zIndex: 100, // Ensure it's above other content
  },
  picker: {
    height: 50,
    width: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayOfWeekCell: {
    width: '14.28%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayCell: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  currentDay: {
    backgroundColor: '#f5a623', // Highlight current day
  },
});

export default HomeNavigation;
