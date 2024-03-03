"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "../file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Server name must be at least 3 characters",
    })
    .max(30, {
      message: "Server name cannot exceed 30 characters",
    }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

export default function InitialModal() {
  const { isOpen, onOpen } = useModal();
  const router = useRouter();

  useEffect(() => {
    onOpen("initial");
  }, [onOpen]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name, imageUrl } = values;

    try {
      await axios.post("/api/servers", { name, imageUrl });
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-3xl mb-4">
            Create your own server! 🐲
          </DialogTitle>
          <DialogDescription className="text-center">
            Give your server a personality with a name and an image. You can
            always come back to change it!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-5">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server image</FormLabel>
                    <div className="flex justify-center items-center text-center h-64 ">
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          handleChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                    <div className="h-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Server name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="server name..."
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="h-4">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter className="pt-7">
              <Button type="submit" disabled={isLoading} variant={"primary"}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
