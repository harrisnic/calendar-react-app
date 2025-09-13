import type {Address} from "../types";


/**
 * Formats an address object into a string representation
 * Returns null if all address fields are empty
 * Otherwise concatenates the non-empty fields
 *
 * @param address Address object containing address fields
 * @param lineBreak Whether to include line break characters between parts
 * @returns Formatted address string or null if all fields are empty
 */
export const formatAddress = (address: Address, lineBreak: boolean = true): string | null => {

    const { AddressLine1, AddressLine2, PostCode, City, Country } = address;

    // Check if all address values are empty or empty strings
    if (
        (!AddressLine1 || AddressLine1.trim() === "") &&
        (!AddressLine2 || AddressLine2.trim() === "") &&
        (!PostCode || String(PostCode).trim() === "") &&
        (!City || City.trim() === "") &&
        (!Country || Country.trim() === "")
    ) {
        return null;
    }

    // non-empty address parts
    const addressParts = [];

    // Push non-empty parts to the array
    if (AddressLine1 && AddressLine1.trim() !== "") addressParts.push(AddressLine1.trim());
    if (AddressLine2 && AddressLine2.trim() !== "") addressParts.push(AddressLine2.trim());
    if (PostCode && String(PostCode).trim() !== "") addressParts.push(String(PostCode).trim());
    if (City && City.trim() !== "") addressParts.push(City.trim());
    if (Country && Country.trim() !== "") addressParts.push(Country.trim());

    const separator = lineBreak ? '\n' : ', ';
    return addressParts.join(separator);
}

