"use client";
import { useState } from "react";
import { Loader2, Megaphone, Newspaper } from "lucide-react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AsciiRenderer, OrbitControls } from "@react-three/drei";
import Model from "./Model";
import useDarkMode from "./darkmode";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const isDarkMode = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendSlackMessage = async () => {
    setIsLoading(true);
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL; 

    if (!slackWebhookUrl) {
      toast.error("Please contact us at team@koahlabs.com");
      return;
    }

    try {
      const response = await fetch(slackWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message to Slack");
      }
      toast.success("Our team will get back to you soon.");
    } catch (error) {
      console.error("Error sending message to Slack:", error);
      toast.error("Please try again later.");
    }

    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)] overflow-y-auto mt-10 px-4">
      <main className="flex flex-col gap-10 max-w-xl">
        <div>
          <div className="text-2xl font-medium">MadLad</div>
          <span className="text-sm text-slate-500">by KOAH Labs</span>
        </div>
        <div>
          We make ads more relevant for AI native users.
          <br />
          <br />
          We help elevate brands in the context of AI responses, whether they be
          text, image, or video.
        </div>
        <div className="flex gap-2 text-sm">
          <button
            className="flex rounded-lg font-medium transition-colors items-center justify-center bg-foreground text-background gap-4 hover:bg-[#383838] dark:hover:bg-[#ccc] h-10 px-4 sm:w-fit"
            onClick={() => setIsOpen(true)}
          >
            For Publishers
            <Newspaper size={16} />
          </button>
          <button
            className="flex rounded-lg font-medium transition-colors items-center justify-center
              bg-gradient-to-b from-[#2564EB] to-[#3B81F5] text-background gap-4 hover:from-[#1346C2] hover:to-[#2A6AD8] dark:hover:from-[#999] dark:hover:to-[#aaa] 
              h-10 px-4 sm:w-fit border border-[#1E4EBB]"
          >
            <a
              className=""
              href="mailto:team@koahlabs.com?subject=Advertiser%20Inquiry"
              target="_blank"
              rel="noopener noreferrer"
            >
              For Advertisers
            </a>

            <Megaphone size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold">How does it work?</div>
          <span>
            MadLad ads are nested in the LLM response. We take the context of
            the query or conversation & make sure the brand&apos;s mention is
            highly relevant to the user&apos;s current interaction with the
            application.
            <br />
            <br />
            MadLad ads feel natural. They don&apos;t look like ads, they look
            like responses. The result is a more streamlined experience for the
            user, and a better outcome for the advertiser.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold">How does it work?</div>
          <span>
            MadLad ads are nested in the LLM response. We take the context of
            the query or conversation & make sure the brand&apos;s mention is
            highly relevant to the user&apos;s current interaction with the
            application.
            <br />
            <br />
            MadLad ads feel natural. They don&apos;t look like ads, they look
            like responses. The result is a more streamlined experience for the
            user, and a better outcome for the advertiser.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold">Who are we?</div>
          <span>
            We are a team of engineers, designers and thinkers.
            <br />
            We are based in San Francisco and are backed by South Park Commons.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold">
            I have more questions. How can I talk to you?
          </div>
          <span>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="mailto:team@koahlabs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              team@koahlabs.com
            </a>
          </span>
        </div>
      </main>

      <footer className="flex flex-col items-center justify-between w-full max-w-xl mt-12 gap-10 text-slate-500">
        <div className="flex items-center justify-between w-full">
          <span className="flex items-center gap-2 hover:underline hover:underline-offset-4">
            KOAH Labs 2024 — San Francisco
          </span>

          <div className="flex grow-1" />

          <div className="flex items-center gap-4">
            <a
              className="flex items-center gap-1 hover:underline hover:underline-offset-4"
              href="https://x.com/koahlabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              𝕏.COM
            </a>

            <a
              className="flex items-center gap-1 hover:underline hover:underline-offset-4"
              href="mailto:team@koahlabs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              CONTACT
            </a>
          </div>
        </div>
        <div className="w-screen h-60">
          <Canvas camera={{ position: [0, 0, 6] }}>
            <Suspense fallback={null}>
              <color attach="background" args={["#000"]} />
              <Model />
            </Suspense>
            <OrbitControls />
            {isDarkMode ? (
              <AsciiRenderer fgColor="white" bgColor="#0a0a0a" />
            ) : (
              <AsciiRenderer fgColor="black" bgColor="white" />
            )}
          </Canvas>
        </div>
      </footer>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent aria-describedby="request-demo-dialog-description">
          <form onSubmit={(e) => {
            e.preventDefault();
            sendSlackMessage();
          }}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <DialogTitle>See how MadLad works</DialogTitle>
                <span className="text-slate-500">
                  Request a demo to check out MadLad in action
                </span>
              </div>

              <div className="flex flex-col items-start gap-2">
                <span className="font-medium text-sm">Email</span>
                <Input
                  placeholder="corporate@email.com"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
