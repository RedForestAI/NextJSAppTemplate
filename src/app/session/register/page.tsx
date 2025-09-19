"use client";

import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleWhole, faBook, faHeart, faRocket } from '@fortawesome/free-solid-svg-icons';

import { Button } from '~/components/ui/button';
import { AuthCard } from '~/app/session/auth-form';

function RoleButton({ role }: { role: string }) {
  return (
    <Button
      asChild
      variant="outline"
      className="
        flex flex-col w-24 h-24 rounded-2xl
        items-center justify-center gap-2
        hover:text-primary hover:border-primary
        transition-colors duration-200
      "
    >
      <Link href={`/session/register/${role.toLowerCase()}`}>
        {role === "Teacher" && <FontAwesomeIcon icon={faAppleWhole} className="text-5xl" />}
        {role === "Student" && <FontAwesomeIcon icon={faBook} className="text-5xl" />}
        {role === "Parent" && <FontAwesomeIcon icon={faHeart} className="text-5xl" />}
        {role === "Researcher" && <FontAwesomeIcon icon={faRocket} className="text-5xl" />}
        <span>{role}</span>
      </Link>
    </Button>
  );
}

export default function Register() {
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  return (
    <div>
      <AuthCard
        title="Register an Account"
        successMsg={successMsg}
        errorMsg={error}
        onToastDismiss={(type) => {
          if (type === "error") setError("");
          if (type === "success") setSuccessMsg("");
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-row flex-wrap justify-between gap-y-4 gap-x-1">
            <RoleButton role="Student" />
            <RoleButton role="Teacher" />
            <RoleButton role="Parent" />
            <RoleButton role="Researcher" />
          </div>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => router.push("/session/login")}
          >
            Already have an account? Log in
          </Button>
        </div>
      </AuthCard>
    </div>
  );
}