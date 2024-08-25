export function validateName(name){
    return name.trim().replace(/\s+/g, ' ').length > 0;
}

export function validateAddress(address){
    return address.trim().replace(/\s+/g, ' ').length > 0;
}

export function validateLongitude(longitude){
    return parseFloat(longitude) <= 180 && parseFloat(longitude) >= -180;
}

export function validateLatitude(latitude){
    return parseFloat(latitude) >= -90 && parseFloat(latitude) <= 90;
}