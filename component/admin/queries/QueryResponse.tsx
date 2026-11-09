"use client";

import { useState } from "react";
import { Send, MessageSquare, LockKeyhole, Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MAX_LENGTH = 1000;

export default function QueryResponse() {
  const [message, setMessage] = useState("");
  const [responseType, setResponseType] = useState<"public" | "internal">(
    "public",
  );

  const [responses, setResponses] = useState<
    { message: string; type: "public" | "internal"; date: string }[]
  >([]);

  const handleSendResponse = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    setResponses((previous) => [
      ...previous,
      {
        message: trimmedMessage,
        type: responseType,
        date: new Date().toLocaleString(),
      },
    ]);

    setMessage("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="size-5" />
              Reply to Customer
            </CardTitle>
            <CardDescription className="mt-1">
              Write a response or add an internal note for your team.
            </CardDescription>
          </div>

          <Badge variant="outline">
            {responses.length}{" "}
            {responses.length === 1 ? "Response" : "Responses"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Response Type</Label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setResponseType("public")}
              className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                responseType === "public"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <div className="rounded-md bg-blue-100 p-2 text-blue-700">
                <MessageSquare className="size-4" />
              </div>

              <div>
                <p className="text-sm font-medium">Public Reply</p>
                <p className="text-xs text-muted-foreground">
                  Visible to the customer
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setResponseType("internal")}
              className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                responseType === "internal"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <div className="rounded-md bg-orange-100 p-2 text-orange-700">
                <LockKeyhole className="size-4" />
              </div>

              <div>
                <p className="text-sm font-medium">Internal Note</p>
                <p className="text-xs text-muted-foreground">
                  Only visible to admins
                </p>
              </div>
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>
            {responseType === "public" ? "Your Response" : "Internal Note"}
          </Label>

          <Textarea
            id="query-response"
            placeholder={
              responseType === "public"
                ? "Write your response to the customer..."
                : "Write an internal note for your team..."
            }
            value={message}
            maxLength={MAX_LENGTH}
            onChange={(event) => setMessage(event.target.value)}
            rows={5}
            className="resize-none"
          />

          <div className="flex justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              {responseType === "public"
                ? "The customer will be able to see this message."
                : "This note will only be visible to administrators."}
            </p>

            <span className="shrink-0 text-xs text-muted-foreground">
              {message.length}/{MAX_LENGTH}
            </span>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
          <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <p className="text-xs leading-5 text-muted-foreground">
            Please provide clear information to help resolve the customer's
            issue.
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSendResponse}
            disabled={!message.trim()}
            className="gap-2"
          >
            <Send className="size-4" />
            {responseType === "public" ? "Send Response" : "Add Internal Note"}
          </Button>
        </div>
        {responses.length > 0 && (
          <div className="space-y-3 border-t pt-5">
            <h3 className="text-sm font-semibold">Recently Added</h3>

            {responses.map((response, index) => (
              <div
                key={`${response.date}-${index}`}
                className="rounded-lg border p-4"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <Badge
                    variant="outline"
                    className={
                      response.type === "public"
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-orange-200 bg-orange-50 text-orange-700"
                    }
                  >
                    {response.type === "public"
                      ? "Public Reply"
                      : "Internal Note"}
                  </Badge>

                  <span className="text-xs text-muted-foreground">
                    {response.date}
                  </span>
                </div>

                <p className="whitespace-pre-wrap text-sm leading-6">
                  {response.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
