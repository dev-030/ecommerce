"use client";

import Heading from "@/app/components/Heading";
import MyButton from "@/app/components/MyButton";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import CustomCheckBox from "@/app/components/inputs/customCheckbox";
import TextArea from "@/app/components/inputs/textArea";
import { categories } from "@/libs/Categorys";
import { colors } from "@/libs/Colors";
import FirebaseApp from "@/libs/firebase";
import axios from "axios";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type ImageType = {
	color: string;
	colorCode: string;
	image: File | null;
};

export type UploadedImageType = {
	color: string;
	colorCode: string;
	image: string;
};

export default function AddProductForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [images, setImages] = useState<ImageType[] | null>();
	const [isProductCreated, setIsProductCreated] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			description: "",
			brand: "",
			category: "",
			inStock: false,
			images: [],
			price: "",
		},
	});

	useEffect(() => {
		setCustomValue("images", images);
	}, [images]);

	useEffect(() => {
		if (isProductCreated) {
			reset();
			setImages(null);
			setIsProductCreated(false);
		}
	}, [isProductCreated]);

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);
		let uploadedImages: UploadedImageType[] = [];

		if (!data.category) {
			setIsLoading(false);
			return toast.error("Category is not selected");
		}

		if (!data.images || data.images.length === 0) {
			setIsLoading(false);
			return toast.error("No selected image");
		}

		// upload images to firebase
		const handleImageUpload = async () => {
			toast("Creating product. please wait....");
			try {
				for (const item of data.images) {
					if (item.image) {
						const fileName = new Date().getTime() + "-" + item.image.name;
						const storage = getStorage(FirebaseApp);
						const storageRef = ref(storage, `products/${fileName}`);
						const uploadTask = uploadBytesResumable(storageRef, item.image);

						await new Promise<void>((resolve, reject) => {
							uploadTask.on(
								"state_changed",
								(snapShot) => {
									const progress =
										(snapShot.bytesTransferred / snapShot.totalBytes) * 100;
									// console.log("Upload is " + progress + "% done");
									switch (snapShot.state) {
										case "paused":
											console.log("Upload is paused");
											break;
										case "running":
											// console.log("Upload is running");
											break;
									}
								},
								(error) => {
									console.log("Error uploading image", error);
									reject(error);
								},
								() => {
									// Handle successful uploads on complete
									getDownloadURL(uploadTask.snapshot.ref)
										.then((downloadURL) => {
											uploadedImages.push({
												...item,
												image: downloadURL,
											});

											console.log("File available at", downloadURL);
											resolve();
										})
										.catch((error) => {
											console.log("Error getting the downloadURL", error);
											reject(error);
										});
								},
							);
						});
					}
				}
			} catch (error) {
				setIsLoading(false);
				console.log("Error handling image uploads", error);
				return toast.error("Error handling image uploads");
			}
		};

		// save product to mongoDB
		await handleImageUpload();
		const productData = { ...data, images: uploadedImages };
		// console.log(`Productdata--->${productData}`);
		axios
			.post("/api/product", productData)
			.then(() => {
				toast.success("Product Created");
				setIsProductCreated(true);
				router.refresh();
			})
			.catch(() => {
				toast.error("something went wrong saving file to db.");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const category = watch("category");
	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	const addImageToState = useCallback((value: ImageType) => {
		setImages((prev) => {
			if (!prev) return [value];

			return [...prev, value];
		});
	}, []);

	const removeImageFromState = useCallback((value: ImageType) => {
		setImages((prev) => {
			if (prev) {
				const filteredImages = prev.filter(
					(item) => item.color !== value.color,
				);
				return filteredImages;
			}
			return prev;
		});
	}, []);

	return (
		<>
			<Heading title="Add a Product" center />
			<Input
				id="name"
				lable="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="price"
				lable="Price"
				disabled={isLoading}
				register={register}
				type="number"
				errors={errors}
				required
			/>
			<Input
				id="brand"
				lable="Brand"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<TextArea
				id="description"
				lable="Description"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<CustomCheckBox
				id="inStock"
				register={register}
				label="This Product is in stock"
			/>
			<div className="w-full font-medium">
				<div className="mb-2 font-semibold">Select a Category</div>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
					{categories?.map((item) => {
						if (item.label === "All") return null;
						return (
							<div key={item.label} className="col-span">
								<CategoryInput
									onClick={(category) => setCustomValue("category", category)}
									selected={category === item.label}
									label={item.label}
									icon={item.icon}
								/>
							</div>
						);
					})}
				</div>
			</div>
			<div className="w-full flex flex-col flex-wrap gap-4">
				<div>
					<div className="font-bold">
						Select the available product colors and upload their images.
					</div>
					<div className="text-sm">
						You must upload an image for each of the color selected otherwise
						your color selection will be ignored.
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3">
					{colors.map((item, index) => {
						return (
							<SelectColor
								key={index}
								item={item}
								addImageToState={addImageToState}
								removeImageFromState={removeImageFromState}
								isProductCreated={isProductCreated}
							/>
						);
					})}
				</div>
			</div>

			<MyButton
				label={isLoading ? "Loading..." : "Add Product"}
				onClick={handleSubmit(onSubmit)}
			/>
		</>
	);
}
