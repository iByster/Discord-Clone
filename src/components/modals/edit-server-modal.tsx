"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import FileUpload from "../file-upload";
import { useEffect } from "react";

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

export default function EditServer() {
  const { isOpen, onClose, type, data } = useModal();
  const { server } = data;
  const router = useRouter();
  const isModalOpen = isOpen && type === "editServer";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (server) {
      form.setValue("name", server.name);
      form.setValue("imageUrl", server.imageUrl);
    }
  }, [server, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name, imageUrl } = values;

    try {
      await axios.patch(`/api/servers/${server?.id}`, { name, imageUrl });
      toast.success("Server edited!");
      form.reset();
      router.refresh();
      onClose();
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-3xl mb-4">
            Edit your server! 👺
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
                Edit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
