import { AllSubcategory } from './../interfaces/AllSubcategory.interface';
import { SpacificBrand } from './../interfaces/Spacific.brand.interface ';
import { Brand } from "@/interfaces/brand.interface";
import { Category } from "@/interfaces/categories.interface";
import { ListingResponse } from "@/interfaces/listing.api.interface";
import { product } from "@/interfaces/produuct.interface";
import { SpacificSubcategory } from '@/interfaces/Spacific.Subcategory.interface';
import { Subcategory } from '@/interfaces/Subcategory.interface';

export type categoriesResponse = ListingResponse<Category>
export type ProductsResponse = ListingResponse<product>
export type BrandResponse = ListingResponse<Brand>
export type SpacificBrandResponse = ListingResponse<SpacificBrand>
export type SpacificCategoryResponse = ListingResponse<SpacificSubcategory>
export type AllCategoryResponse = ListingResponse<AllSubcategory>
export type SubCategoryResponse = ListingResponse<Subcategory>