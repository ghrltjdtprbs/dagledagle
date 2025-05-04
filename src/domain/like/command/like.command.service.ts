import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from '../entity/like.entity';
import { PostEntity } from '../../post/entity/post.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationEvent } from '../../notification/event/notification.event';

@Injectable()
export class LikeCommandService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepo: Repository<LikeEntity>,

    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async toggle(postId: number, userId: number): Promise<boolean> {
    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['author'],
    });

    const user = await this.userRepo.findOneByOrFail({ id: userId });

    if (!post) throw new Error('게시글이 존재하지 않습니다.');

    const existing = await this.likeRepo.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (existing) {
      await this.likeRepo.remove(existing);
      post.likeCount--;
      await this.postRepo.save(post);
      return false;
    }

    const like = this.likeRepo.create({ post, user });
    await this.likeRepo.save(like);
    post.likeCount++;
    await this.postRepo.save(post);

    if (post.author.id !== userId) {
      this.eventEmitter.emit(
        'notification.created',
        new NotificationEvent(
          post.author.id,
          `게시글 "${post.title}"에 좋아요가 눌렸습니다.`,
        ),
      );
    }

    return true;
  }
}
