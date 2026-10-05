import { Link } from 'react-router-dom';
import { ArrowRight, Bus, CircleCheck, Monitor, Smartphone, Store } from 'lucide-react';
import { Brand, Card, Pill, RouteArt } from '../../components/ui';
export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <Brand />
        <Link className="button secondary" to="/demo-control">
          Điều khiển hành trình
        </Link>
      </header>
      <main>
        <div className="landing-hero">
          <div>
            <Pill>Hành trình liền mạch · Trải nghiệm kết nối</Pill>
            <h1>
              Mỗi điểm dừng,
              <br />
              một hành trình tốt hơn.
            </h1>
            <p>
              Từ lên lịch chuyến đi, đặt món trước đến vận hành trạm.
              <br />
              Khám phá hệ sinh thái Trạm Việt qua một hành trình thực tế.
            </p>
            <Link className="button" to="/app">
              Bắt đầu hành trình <ArrowRight size={19} />
            </Link>
            <span className="hero-note">
              <CircleCheck size={16} /> Không cần cài đặt
            </span>
          </div>
          <div className="hero-visual">
            <RouteArt />
            <div className="floating-card">
              <span className="metric-icon">
                <Bus />
              </span>
              <div>
                <strong>Hà Nội → Đà Nẵng</strong>
                <p>Hoàng Long Express · 42 hành khách</p>
                <Pill tone="green">Điểm dừng tiếp theo · Ninh Bình</Pill>
              </div>
            </div>
            <div className="hero-caption">Bạn đồng hành xuyên Việt</div>
          </div>
        </div>
        <div className="section-heading">
          <div>
            <span className="eyebrow">MỘT HỆ SINH THÁI, BA GÓC NHÌN</span>
            <h2>Chọn trải nghiệm của bạn</h2>
          </div>
          <p>Hành trình, cửa hàng và trạm cùng kết nối.</p>
        </div>
        <div className="surface-grid">
          {[
            {
              to: '/app',
              icon: Smartphone,
              label: 'Dành cho người đi đường',
              title: 'Travel App',
              description: 'Lên lịch, chia sẻ hành trình, đặt món và theo dõi chuyến đi.',
              tag: 'Mobile',
            },
            {
              to: '/merchant/login',
              icon: Store,
              label: 'Dành cho từng cửa hàng',
              title: 'Merchant POS',
              description: 'Nhận đơn, chuẩn bị theo giờ xe đến và bàn giao đúng lúc.',
              tag: 'Mobile / POS',
            },
            {
              to: '/station/login',
              icon: Monitor,
              label: 'Dành cho quản lý trạm',
              title: 'Station Portal',
              description: 'Thấy trước nhu cầu, điều phối cửa hàng và theo dõi doanh thu.',
              tag: 'Desktop / Tablet',
            },
          ].map(({ to, icon: Icon, label, title, description, tag }) => (
            <Link className="surface-card card" key={to} to={to}>
              <span className="surface-icon">
                <Icon size={27} />
              </span>
              <small>{label}</small>
              <h2>{title}</h2>
              <p>{description}</p>
              <div>
                <Pill>{tag}</Pill>
                <ArrowRight size={21} />
              </div>
            </Link>
          ))}
        </div>
        <Card className="guest-banner">
          <div>
            <span className="eyebrow">KHÁCH QUÉT QR TRÊN XE</span>
            <h2>Xem hành trình, đặt món trước.</h2>
            <p>Không cần tài khoản. Không cần tải app.</p>
          </div>
          <Link className="button secondary" to="/t/HN-DN-A8K29">
            Xem hành trình trên xe <ArrowRight size={18} />
          </Link>
        </Card>
      </main>
      <footer>
        Trạm Việt · Bạn đồng hành xuyên Việt
        <span>Lên lịch, khám phá và nghỉ chân trên mọi hành trình.</span>
      </footer>
    </div>
  );
}
