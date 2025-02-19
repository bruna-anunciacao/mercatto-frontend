export const Theme = () => {
    const selectedTheme = 'default';
    const themes = {
        default: {
            primary: '#ff6b00',
            secondary: '#f5f5f5',
            background: '#f5f5f5',
            text: '#000000',
        },
    };
    return themes[selectedTheme];
}