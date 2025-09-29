import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

export const dynamic = "force-dynamic";

async function fetchCustomer(id) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

export default async function ReadPage({ searchParams }) {
  // App Router では URL のクエリは searchParams から取得する
  const id = searchParams?.id;

  if (!id) {
    return (
      <>
        <div className="alert alert-warning">ID が指定されていません</div>
        <button className="btn btn-outline btn-accent">
          <a href="/customers">一覧に戻る</a>
        </button>
      </>
    );
  }

  const customerInfo = await fetchCustomer(id);

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        {customerInfo?.[0] ? (
          <OneCustomerInfoCard {...customerInfo[0]} />
        ) : (
          <div className="alert alert-error">データが見つかりませんでした</div>
        )}
      </div>
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
}
