fetch("https://raw.githubusercontent.com/yleprince/data/master/coronavirus/countries_light.json")
    .then(raw => raw.json())
    .then(countries => {
        create_map(countries);
        createLinechart(countries);
    });