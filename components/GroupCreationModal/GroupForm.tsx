"use client"

import React, { useState } from 'react';
import { Input } from '../Input';
import { Button } from "@heroui/button";
import {Select, SelectSection, SelectItem} from "@heroui/select";

interface GroupFormValues {
  Name: string;
  Description: string;

}

const GroupForm = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [formValues, setFormValues] = useState<GroupFormValues>({
    Name: '',
    Description: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formValues.Name) {
      newErrors.Name = 'Name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

/*   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const objectURL = URL.createObjectURL(file); // Tworzymy tymczasowy URL
      setImageUrl(objectURL); // Ustawiamy URL w stanie
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      Banner: file,
    }));
  }; */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const formData = new FormData();
    formData.append('Name', formValues.Name);
    formData.append('Description', formValues.Description);
    console.log('Submitting form data:', formData);
    // Example API call
    // axios.post('/api/groups', formData);
  };

  return (
    <form onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-center items-center gap-5'>
      <Input
        label="Name of group"
        value={formValues.Name}
        onChange={handleChange}
        error={errors.Name}
      />
      <Input
        label="Write a description"
        value={formValues.Description}
        onChange={handleChange}
        error={errors.Description}
        type='textarea'
      />
      <Select
        className="w-full"
        label="Privacy"
        placeholder="Select a privacy of group"
        variant="bordered"
      >
        <SelectItem key={"1"} textValue='Private'>
          <div className="w-full flex flex-col justify-center items-start gap-2">
            <p className="text-md">Private</p>
            <p className="text-xs">Description</p>
          </div>
        </SelectItem>

      </Select>
      <Button type='submit' color='default' className='w-full bg-rose-500 dark:bg-neural-300 dark:text-black text-white'>Create</Button>
    </form>
  );
};

export default GroupForm;
