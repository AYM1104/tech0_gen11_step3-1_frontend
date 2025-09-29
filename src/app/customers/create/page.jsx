"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import createCustomer from "./createCustomer";

export default function CreatePage() {
  const formRef = useRef();
  const router = useRouter();
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // エラーをクリア
    
    try {
      const formData = new FormData(formRef.current);
      await createCustomer(formData);
      router.push(`./create/confirm?customer_id=${formData.get("customer_id")}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="card-body">
              <h2 className="card-title">
                <p>
                  <input
                    type="text"
                    name="customer_name"
                    placeholder="桃太郎"
                    className="input input-bordered"
                  />
                </p>
              </h2>
              <p>
                Customer ID:
                <input
                  type="text"
                  name="customer_id"
                  placeholder="C030"
                  className="input input-bordered"
                />
              </p>
              <p>
                Age:
                <input
                  type="number"
                  name="age"
                  placeholder="30"
                  className="input input-bordered"
                />
              </p>
              <p>
                Gender:
                <input
                  type="text"
                  name="gender"
                  placeholder="女"
                  className="input input-bordered"
                />
              </p>
              {/* エラーメッセージ表示 */}
              {error && (
                <div className="alert alert-error">
                  <span>{error}</span>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary m-4 text-2xl">
                作成
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
