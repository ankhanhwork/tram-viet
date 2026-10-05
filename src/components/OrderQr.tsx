import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Card, notify } from './ui';
import { useDemoStore } from '../store/useDemoStore';
import type { Order } from '../types';
export const pickupPayload = (order: Order) =>
  `tramviet:pickup:${order.id}:${order.pickupToken ?? order.id}`;
export function OrderQr({ order }: { order: Order }) {
  const [src, setSrc] = useState('');
  useEffect(() => {
    let active = true;
    void QRCode.toDataURL(pickupPayload(order), {
      width: 256,
      margin: 2,
      errorCorrectionLevel: 'M',
    })
      .then((v) => {
        if (active) setSrc(v);
      })
      .catch(() => notify('Chưa tạo được QR, hãy mở lại đơn hàng.'));
    return () => {
      active = false;
    };
  }, [order]);
  return (
    <Card className="order-qr">
      <h2>QR nhận hàng</h2>
      {src ? (
        <>
          <img src={src} alt={`QR nhận đơn ${order.publicOrderCode}`} />
          <a className="text-link" download={`QR-${order.publicOrderCode}.png`} href={src}>
            Lưu QR về máy
          </a>
        </>
      ) : (
        <p>Đang tạo mã QR…</p>
      )}
      <p>Đưa mã này cho nhân viên tại từng quầy. Mỗi quầy chỉ xác nhận phần món của mình.</p>
      <strong>{order.publicOrderCode}</strong>
    </Card>
  );
}
export function PickupScanner({ partId, close }: { partId: string; close: () => void }) {
  const s = useDemoStore(),
    [payload, setPayload] = useState(''),
    [verified, setVerified] = useState(false),
    [reading, setReading] = useState(false);
  const part = s.merchantOrders.find((p) => p.id === partId),
    order = s.orders.find((o) => o.id === part?.orderId);
  if (!part || !order || part.merchantId !== s.merchantSessionId) return null;
  function verify(value: string) {
    setVerified(false);
    if (value.trim() !== pickupPayload(order!)) {
      notify('QR không thuộc đơn này. Vui lòng kiểm tra lại khách và đơn hàng.');
      return;
    }
    setPayload(value.trim());
    setVerified(true);
    notify('Đúng đơn hàng. Kiểm tra món trước khi bàn giao.');
  }
  async function scan(file: File) {
    if (!file.type.startsWith('image/') || file.size > 10 * 1024 * 1024)
      return notify('Chọn ảnh QR dưới 10 MB.');
    setReading(true);
    setVerified(false);
    try {
      const { default: jsQR } = await import('jsqr');
      const bitmap = await createImageBitmap(file),
        canvas = document.createElement('canvas');
      canvas.width = Math.min(bitmap.width, 1600);
      canvas.height = Math.round((bitmap.height * canvas.width) / bitmap.width);
      const context = canvas.getContext('2d')!;
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height),
        result = jsQR(pixels.data, pixels.width, pixels.height);
      if (!result) notify('Chưa đọc được QR. Chọn ảnh rõ, đủ bốn góc mã.');
      else verify(result.data);
    } catch {
      notify('Không đọc được ảnh. Chọn lại ảnh QR.');
    } finally {
      setReading(false);
    }
  }
  return (
    <>
      <p>Quét ảnh QR khách đưa để đối chiếu đơn và quầy nhận hàng.</p>
      <label className="upload-zone">
        {reading ? 'Đang đọc QR…' : 'Chọn ảnh QR của khách'}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          disabled={reading}
          onChange={(e) => {
            if (e.target.files?.[0]) void scan(e.target.files[0]);
          }}
        />
      </label>
      <details>
        <summary>Dùng dữ liệu từ máy quét QR</summary>
        <label>
          Nội dung QR
          <input
            autoComplete="off"
            value={payload}
            onChange={(e) => {
              setPayload(e.target.value);
              setVerified(false);
            }}
          />
        </label>
        <button className="button secondary full" onClick={() => verify(payload)}>
          Kiểm tra QR
        </button>
      </details>
      {verified && (
        <div className="alert">
          <strong>
            {order.customerName} · {order.publicOrderCode}
          </strong>
          <p>{part.items.map((i) => `${i.quantity} × ${i.name}`).join(' · ')}</p>
        </div>
      )}
      <button
        className="button full"
        disabled={!verified || reading}
        onClick={() => {
          if (payload !== pickupPayload(order)) return notify('QR không hợp lệ.');
          const error = useDemoStore.getState().confirmPickupQr(partId, payload);
          if (error) return notify(error);
          notify('Đã xác nhận bàn giao đúng đơn.');
          close();
        }}
      >
        Xác nhận bàn giao
      </button>
    </>
  );
}
