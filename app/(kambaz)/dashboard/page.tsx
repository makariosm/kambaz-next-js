import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3520" className="wd-dashboard-course-link">
            <Image src="/images/C++.jpg" width={200} height={150} alt="C++" />
            <div>
              <h5> CS3520 Programming - C++ </h5>
              <p className="wd-dashboard-course-title">
                Backend software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/4530" className="wd-dashboard-course-link">
            <Image src="/images/swe.jpg" width={200} height={150} alt="swe" />
            <div>
              <h5> CS4530 SWE </h5>
              <p className="wd-dashboard-course-title">Software Engineering</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/4550" className="wd-dashboard-course-link">
            <Image
              src="/images/webdev.jpg"
              width={200}
              height={150}
              alt="webdev"
            />
            <div>
              <h5> CS4550 Web Development </h5>
              <p className="wd-dashboard-course-title">
                Software Web Developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2540" className="wd-dashboard-course-link">
            <Image
              src="/images/networks.jpg"
              width={200}
              height={150}
              alt="networks"
            />
            <div>
              <h5> EECE2540 - Networks </h5>
              <p className="wd-dashboard-course-title">Networks Engineering</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2322" className="wd-dashboard-course-link">
            <Image
              src="/images/comparch.jpg"
              width={200}
              height={150}
              alt="comparch"
            />
            <div>
              <h5> EECE2322 - Computer Architecture </h5>
              <p className="wd-dashboard-course-title">Hardware Engineering</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3500" className="wd-dashboard-course-link">
            <Image src="/images/ood.jpg" width={200} height={150} alt="ood" />
            <div>
              <h5> CS3500 Object-Oriented Design </h5>
              <p className="wd-dashboard-course-title">Software Architect</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
