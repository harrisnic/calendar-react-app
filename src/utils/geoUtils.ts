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


}

