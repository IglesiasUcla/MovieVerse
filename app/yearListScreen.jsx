import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme, StatusBar } from 'react-native';
import Header from '../components/Header'; // Importamos el Header ya implementado
import { Colors } from '../constants/Colors';
import { Themes } from '../constants/Themes';
import { useRouter } from 'expo-router';

const YearListScreen = () => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme] || Colors.light;
  const router = useRouter();

  // Datos: décadas y años agrupados
  const decades = [
    { title: '2020s', years: [2023, 2022, 2021, 2020] },
    { title: '2010s', years: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010] },
    { title: '2000s', years: [2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000] },
    { title: '1990s', years: [1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990] },
    { title: '1980s', years: [1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980] },
    { title: '1970s', years: [1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970] },
  ];

  // Renderiza los años de una década
  const renderYears = (years) =>
    years.map((year) => (
      <TouchableOpacity
        key={year}
        style={styles.yearButton}
        onPress={() => router.push(`/moviesByYear/${year}`)} // Navega a la pantalla de películas por año
      >
        <Text style={styles.yearText}>{year}</Text>
      </TouchableOpacity>
    ));

  // Renderiza cada década y sus años
  const renderDecade = ({ item }) => (
    <View style={styles.decadeContainer}>
      <Text style={styles.decadeTitle}>{item.title}</Text>
      <View style={styles.yearsContainer}>{renderYears(item.years)}</View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
    <StatusBar barStyle="light-content" backgroundColor={Themes.colors.purpleStrong} />
      {/* Header */}
      <Header
        title="Search by Year"
        leftIconName="arrow-back"
        leftIconRoute="/search_movies"
      />

      {/* Lista de décadas y años */}
      <FlatList
        data={decades}
        keyExtractor={(item) => item.title}
        renderItem={renderDecade}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  decadeContainer: {
    marginBottom: 16,
  },
  decadeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Themes.colors.purpleLight,
    marginBottom: 8,
  },
  yearsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8, // Espaciado entre los años
  },
  yearButton: {
    backgroundColor: Themes.colors.grayDark,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  yearText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default YearListScreen;
