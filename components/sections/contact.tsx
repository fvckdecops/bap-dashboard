import React, { useState } from "react";
import { useForm } from '@tanstack/react-form'
import { yupValidator as validatorAdapter } from "@tanstack/yup-form-adapter"
import type { FieldApi } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { FaPaperPlane, FaSpinner } from "react-icons/fa6";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import { verifyToken } from "../Helpers";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.touchedErrors ? (
                <p className="text-sm text-destructive mt-1">{field.state.meta.touchedErrors}</p>
            ) : null}
            {field.state.meta.isValidating ? (
                <p className="text-sm text-muted-foreground">Validating...</p>
            ) : null}
        </>
    )
}

export default function ContactSection(): React.JSX.Element {
    const [token, setToken] = useState<string|null>(null)

    const getToken = (token: string|null) => {
        if(!token) {
            toast.warning("Invalid token.")
            return
        }

        setToken(token)
    }

    const form = useForm({
        validatorAdapter,
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        async onSubmit({ value }) {
            if(await verifyToken(token)) {
                console.log('success', value)
            } else {
                toast.warning("Invalid action.")
            }
        }
    })

    return (
        <section 
            className="grid text-neutral-200 section-container wave-clip-up" 
            id="contact"
            style={{
                backgroundImage: 'url("/assets/images/contact.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            <div className="col-start-1 row-start-1 bg-neutral-900 bg-opacity-80 w-full h-full"></div>
            <div className="col-start-1 row-start-1 mx-4 md:mx-[200px]">
                <div className="flex justify-center items-center pt-5 my-8">
                    <div className="relative flex justify-center items-center">
                        <h3 className="text-xl md:text-2xl font-bold">Contact Me</h3>
                        <span className="absolute -bottom-1 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></span>
                    </div>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className="my-20"
                >
                    <div className="grid grid-cols-3 gap-4">
                        <form.Field
                            name="name"
                            children={(field) => (
                                <div className="mb-4">
                                        <Label htmlFor={field.name}>Name</Label>
                                        <Input 
                                            type="text" 
                                            placeholder="Enter name ..." 
                                            required 
                                            id={field.name} 
                                            name={field.name}
                                            className={cn(
                                                "bg-neutral-200 bg-opacity-50 border-gray-600 placeholder:text-neutral-100 duration-200 text-neutral-100",
                                                "hover:bg-neutral-300 focus:bg-neutral-300 hover:bg-opacity-30 focus:bg-opacity-30"
                                            )
                                            }
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            >
                        </form.Field>
                        <form.Field
                            name="email"
                            children={(field) => (
                                <div className="mb-4">
                                        <Label htmlFor={field.name}>E-mail</Label>
                                        <Input 
                                            type="email" 
                                            placeholder="Enter email ..." 
                                            required 
                                            className={cn(
                                                "bg-neutral-200 bg-opacity-50 border-gray-600 placeholder:text-neutral-100 duration-200 text-neutral-100",
                                                "hover:bg-neutral-300 focus:bg-neutral-300 hover:bg-opacity-30 focus:bg-opacity-30"
                                            )
                                            }
                                            id={field.name} 
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            >
                        </form.Field>
                        <form.Field
                            name="subject"
                            children={(field) => (
                                <div className="mb-4">
                                        <Label htmlFor={field.name}>Subject</Label>
                                        <Input 
                                            type="text" 
                                            placeholder="Enter subject ..." 
                                            required 
                                            className={cn(
                                                "bg-neutral-200 bg-opacity-50 border-gray-600 placeholder:text-neutral-100 duration-200 text-neutral-100",
                                                "hover:bg-neutral-300 focus:bg-neutral-300 hover:bg-opacity-30 focus:bg-opacity-30"
                                            )
                                            }
                                            id={field.name} 
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            >
                        </form.Field>
                    </div>
                    <form.Field
                        name="message"
                        children={(field) => (
                            <div className="mb-4">
                                    <Label htmlFor={field.name}>Message</Label>
                                    <Textarea
                                        placeholder="Enter message ..." 
                                        required 
                                        className={cn(
                                            "resize-none h-[400px] bg-neutral-200 bg-opacity-50 border-gray-600 placeholder:text-neutral-100 duration-200 text-neutral-100",
                                                "hover:bg-neutral-300 focus:bg-neutral-300 hover:bg-opacity-30 focus:bg-opacity-30 mb-4"
                                        )
                                        }
                                        id={field.name} 
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        >
                    </form.Field>
                    
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                                <div className="flex flex-col gap-4 md:justify-between mb-4 items-center">
                                    <ReCAPTCHA
                                        onChange={(token) => getToken(token)}
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                                    />
                                    <Button type="submit" disabled={!canSubmit}>
                                        {isSubmitting
                                            ?  (<> <FaSpinner className="mr-2 animate-spin" /> Loading... </>)
                                            :
                                                (<> <FaPaperPlane className="mr-2" />Send Message </>)
                                        }
                                    </Button>
                                </div>
                        )}
                    />
                </form>
            </div>
        </section>
    )
}