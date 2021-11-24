function capitalize(str = '') {
    const lowerSrt = str.toLowerCase();
    return lowerSrt.replace(/^\D/, lowerSrt.charAt(0).toUpperCase());
}

export default capitalize;
